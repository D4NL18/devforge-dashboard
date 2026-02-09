import { makeAutoObservable, runInAction } from "mobx";
import clientService from "Services/client"; 
import { Graph } from "types/graph.interface";
import { Client } from "types/client.interface";

export class ClientsDashboardStore {
  constructor() {
    makeAutoObservable(this);
  }

  churnRevenueByMonth: Graph[] = [];
  cacByMonth: Graph[] = [];
  ltvByMonth: Graph[] = [];
  
  clientDiversification: Graph[] = [];
  delinquencyRate: Graph[] = [];

  clientsList: Client[] = [];
  totalItems: number = 0;
  isLoadingTable: boolean = false;

  filters = {
    page: 1,
    limit: 8,
    name: "",
    type: undefined as string | undefined,
    revenueMin: 0,
    revenueMax: 10000,
    monthsMin: 0,
    monthsMax: 10000,
    years: [] as string[],
  };

  debounceTimer: any = null;

  async fetchChurnRevenue() {
    try {
      const selectedYear = this.filters.years.length > 0 ? Number(this.filters.years[0]) : new Date().getFullYear();

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
      const selectedYear = this.filters.years.length > 0 ? Number(this.filters.years[0]) : new Date().getFullYear();

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
      const selectedYear = this.filters.years.length > 0 ? Number(this.filters.years[0]) : new Date().getFullYear();

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

  async fetchClientDiversification() {
    try {
      const selectedYear = this.filters.years.length > 0 ? Number(this.filters.years[0]) : new Date().getFullYear();

      const data = await clientService.getClientDiversification();
      runInAction(() => {
        this.clientDiversification = data || [];
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Failed to fetch client diversification:", error.message);
        this.clientDiversification = [];
      });
    }
  }

  async fetchDelinquencyRate() {
    try {
      const selectedYear = this.filters.years.length > 0 ? Number(this.filters.years[0]) : new Date().getFullYear();

      const data = await clientService.getDelinquencyRate();
      runInAction(() => {
        this.delinquencyRate = data || [];
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Failed to fetch delinquency rate:", error.message);
        this.delinquencyRate = [];
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
        years: this.filters.years
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

    if (key !== 'limit') {
        this.filters.page = 1;
    }

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      this.fetchClients();
    }, 1000);
  }

  setPage(pageIndex: number) {
      this.setFilter('page', pageIndex + 1); 
  }
}

export const clientsStore = new ClientsDashboardStore();