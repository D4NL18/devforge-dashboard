import { makeAutoObservable, runInAction } from "mobx";
import clientService from "Services/client"; 
import { Graph } from "types/graph.interface";
import { Client } from "types/client.interface";

export class ClientsDashboardStore {
  constructor() {
    makeAutoObservable(this);
  }

  // --- ESTADOS (Observables) ---
  churnRevenueByMonth: Graph[] = [];
  cacByMonth: Graph[] = [];
  ltvByMonth: Graph[] = [];
  
  clientDiversification: Graph[] = [];
  delinquencyRate: Graph[] = [];

  clientsList: Client[] = [];
  totalItems: number = 0;
  isLoadingTable: boolean = false;

  // Filtros unificados
  filters = {
    page: 1,
    limit: 8,
    name: "",
    type: undefined as string | undefined,
    revenueMin: 0,
    revenueMax: 10000,
    monthsMin: 0,
    monthsMax: 10000,
    years: [] as string[], // Lista de anos selecionados via Select
  };

  debounceTimer: any = null;

  // --- ACTIONS ---

  // Refatorado: Agora não recebe argumento, ele lê diretamente do estado (this.filters)
  async fetchChurnRevenue() {
    try {
      // Lógica de Filtro de Ano:
      // O componente Select retorna um array de strings.
      // Para gráficos mensais (Jan-Dez), geralmente filtramos por um ano específico.
      // Aqui, pegamos o primeiro ano selecionado pelo usuário. Se o array estiver vazio, enviamos undefined.
      const selectedYear = this.filters.years.length > 0 ? Number(this.filters.years[0]) : undefined;

      // Passamos o ano selecionado para o serviço (assumindo que o serviço aceite este parâmetro opcional)
      const data = await clientService.getChurnRevenueByMonth(selectedYear);
      
      runInAction(() => {
        this.churnRevenueByMonth = data || [];
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Failed to fetch churn revenue:", error.message);
        this.churnRevenueByMonth = [];
      });
    }
  }

  async fetchCac() {
    try {
      // Aplicamos a mesma lógica de filtro de ano para o CAC
      const selectedYear = this.filters.years.length > 0 ? Number(this.filters.years[0]) : undefined;

      const data = await clientService.getCac(selectedYear);
      runInAction(() => {
        this.cacByMonth = data || [];
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Failed to fetch CAC:", error.message);
        this.cacByMonth = [];
      });
    }
  }

  async fetchLtv() {
    try {
      // Aplicamos a mesma lógica de filtro de ano para o LTV
      const selectedYear = this.filters.years.length > 0 ? Number(this.filters.years[0]) : undefined;

      const data = await clientService.getClientsLifetimeValueByMonths(selectedYear);
      runInAction(() => {
        this.ltvByMonth = data || [];
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Failed to fetch LTV:", error.message);
        this.ltvByMonth = [];
      });
    }
  }

  async fetchClients() {
    this.isLoadingTable = true;
    try {
      const params = {
        page: this.filters.page,
        limit: this.filters.limit,
        name: this.filters.name,
        type: this.filters.type,
        revenueMin: this.filters.revenueMin,
        revenueMax: this.filters.revenueMax,
        monthsMin: this.filters.monthsMin,
        monthsMax: this.filters.monthsMax,
        years: this.filters.years // Passamos o array completo para a tabela, caso o backend suporte filtro múltiplo
      };

      const response: any = await clientService.getAll(); 

      runInAction(() => {
        this.clientsList = Array.isArray(response) ? response : response?.datas || [];
        this.totalItems = response?.totalResponseItens || this.clientsList.length;
        this.isLoadingTable = false;
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Failed to fetch clients:", error);
        this.clientsList = [];
        this.totalItems = 0;
        this.isLoadingTable = false;
      });
    }
  }

  setFilter(key: keyof typeof this.filters, value: any) {
    (this.filters as any)[key] = value;

    if (key === 'page') {
        this.fetchClients();
        return; 
    }

    // Resetamos a página para 1 se mudarmos qualquer filtro que não seja a paginação
    if (key !== 'limit') {
        this.filters.page = 1;
    }

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    // O debounce afeta a busca da tabela.
    // Nota: Para os gráficos, a atualização é controlada pelo useEffect no componente visual
    // ou poderíamos chamar as funções de gráfico aqui também se quiséssemos "live update" sem useEffect.
    this.debounceTimer = setTimeout(() => {
      this.fetchClients();
    }, 1000);
  }

  setPage(pageIndex: number) {
      this.setFilter('page', pageIndex + 1); 
  }
}

export const clientsStore = new ClientsDashboardStore();