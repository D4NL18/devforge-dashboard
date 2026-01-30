import { makeAutoObservable, runInAction } from "mobx";
import transactionService from "Services/transaction";
import { TableRowBase } from "Components/PaginatedTable";

export type CashFlowRow = TableRowBase & {
  id: number;
  titulo: string;
  categoria: string;
  valor: string;
};

export class TransactionStore {
  constructor() {
    makeAutoObservable(this);
  }

  dreData: any[] = [];
  balanceSheetData: any[] = [];
  cashFlowList: any[] = [];
  costBySegment: any[] = [];
  
  revenue: number = 0;
  currentBalance: number = 0;
  minCash: number = 1500;

  totalItems: number = 0;
  isLoadingTable: boolean = false;

  filters = {
    page: 1,
    limit: 8,
    name: "", 
    category: undefined as string | undefined,
    balanceType: undefined as string | undefined,
    year: undefined as number | undefined,
    month: undefined as number | undefined,
    revenueMin: 0,
    revenueMax: 10000,
  };

  debounceTimer: any = null;

  async fetchDreMetrics() {
    try {
      const data = await transactionService.getDreMetrics();
      runInAction(() => { 
        this.dreData = Array.isArray(data) ? data : []; 
      });
    } catch (error) {
      console.error("Erro DRE:", error);
      runInAction(() => { this.dreData = []; });
    }
  }

  async fetchBalanceSheet() {
    try {
      const data = await transactionService.getBalanceSheet();
      
      runInAction(() => {
        if (!Array.isArray(data)) {
          this.balanceSheetData = [];
          return;
        }

        const ativos = data.filter(item => item.type === 'Ativo');
        const passivos = data.filter(item => item.type === 'Passivo e PL');

        const formattedRows = [];
        let ativoIdx = 0;
        let passivoIdx = 0;

        while (ativoIdx < ativos.length || passivoIdx < passivos.length) {
          const ativo = ativos[ativoIdx];
          const passivo = passivos[passivoIdx];

          if (ativo?.metric === "Ativo Circulante") {
            formattedRows.push({
              leftLabel: "",
              leftValor: "",
              rightLabel: passivo?.metric || "",
              rightValor: passivo ? `R$ ${passivo.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : "",
              bold: passivo?.metric?.toLowerCase().includes('circulante') || false
            });
            
            passivoIdx++;
          }
          const currentAtivo = ativos[ativoIdx];
          const currentPassivo = passivos[passivoIdx];

          if (currentAtivo || currentPassivo) {
            const isBold = currentAtivo?.metric?.toLowerCase().includes('total') || 
                           currentAtivo?.metric?.toLowerCase().includes('circulante') || 
                           currentPassivo?.metric?.toLowerCase().includes('líquido') ||
                           currentPassivo?.metric?.toLowerCase().includes('passivo +');

            formattedRows.push({
              leftLabel: currentAtivo?.metric || "",
              leftValor: currentAtivo ? `R$ ${currentAtivo.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : "",
              rightLabel: currentPassivo?.metric || "",
              rightValor: currentPassivo ? `R$ ${currentPassivo.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : "",
              bold: !!isBold
            });
          }

          ativoIdx++;
          passivoIdx++;
        }

        this.balanceSheetData = formattedRows;
      });
    } catch (error) {
      console.error("Erro Balanço:", error);
      runInAction(() => { this.balanceSheetData = []; });
    }
  }

  async fetchCardMetrics() {
    try {
      const [rev, bal] = await Promise.all([
        transactionService.getRevenue(this.filters.year, this.filters.month),
        transactionService.getCurrentBalance(this.filters.year, this.filters.month)
      ]);
      runInAction(() => {
        this.revenue = rev?.value || 0;
        this.currentBalance = bal?.value || 0;
      });
    } catch (error) {
      console.error("Erro Cards:", error);
    }
  }

  async fetchCostBySegment() {
    try {
      const data = await transactionService.getCostBySegment(this.filters.year, this.filters.month);
      runInAction(() => { 
        this.costBySegment = Array.isArray(data) ? data : []; 
      });
    } catch (error) {
      console.error("Erro Cost Segment:", error);
      runInAction(() => { this.costBySegment = []; });
    }
  }

  async fetchCashFlow() {
    this.isLoadingTable = true;
    try {
      const params: any = {
        page: this.filters.page,
        limit: this.filters.limit,
        category: this.filters.category,
        balanceType: this.filters.balanceType,
        year: this.filters.year,
        month: this.filters.month,
        name: this.filters.name,
      };

      const response = await transactionService.getCashFlow(params);
      
      runInAction(() => {
        const list = response?.listItens || (Array.isArray(response) ? response : []);
        this.cashFlowList = list;
        this.totalItems = response?.totalItens || list.length;
        this.isLoadingTable = false;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoadingTable = false;
        this.cashFlowList = [];
      });
    }
  }

  async remove(id: number) {
    try {
      await transactionService.remove(id);
      this.fetchCashFlow();
      this.fetchCardMetrics();
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  }

  setFilter(key: keyof typeof this.filters, value: any) {
    (this.filters as any)[key] = value;

    if (key === 'page') {
      this.fetchCashFlow();
      return;
    }

    if (key !== 'limit') {
      this.filters.page = 1;
    }

    if (this.debounceTimer) clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      this.fetchCashFlow();
      if (['year', 'month'].includes(key)) {
        this.fetchDreMetrics();
        this.fetchBalanceSheet();
        this.fetchCardMetrics();
        this.fetchCostBySegment();
      }
    }, 500);
  }
}

export const transactionStore = new TransactionStore();