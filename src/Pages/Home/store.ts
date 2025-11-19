import { makeAutoObservable, runInAction } from "mobx";
import homeService from "Services/home";
import { Graph } from "types/graph.interface";

export class HomeStore {
  constructor() {
    makeAutoObservable(this);
  }

  revenue!: Graph;
  currentBalance!: string;
  costBySegment!: Graph[];
  revenueByProject!: Graph[];
  profitByProject!: Graph[];

  async fetchRevenue() {
    try {
      const data = await homeService.getRevenue();
      runInAction(() => {
        this.revenue = data;
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Failed to fetch revenue:", error.message);
      });
    }
  }

  async fetchCurrentBalance() {
    try {
      const data = await homeService.getCurrentBalance();
      runInAction(() => {
        this.currentBalance = data;
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Failed to fetch current balance:", error.message);
      });
    }
  }

  async fetchCostBySegment() {
    try {
      const data = await homeService.getCostBySegment();
      runInAction(() => {
        this.costBySegment = data;
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Failed to fetch cost by segment:", error.message);
      });
    }
  }

  async fetchRevenueByProject() {
    try {
      const data = await homeService.getRevenueByProject();
      runInAction(() => {
        this.revenueByProject = data;
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Failed to fetch revenue by project:", error.message);
      });
    }
  }

  async fetchProfitByProject() {
    try {
      const data = await homeService.getProfitByProject();
      runInAction(() => {
        this.profitByProject = data;
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Failed to fetch profit by project:", error.message);
      });
    }
  }
}

export const homeStore = new HomeStore();
