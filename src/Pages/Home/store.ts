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

  async fetchRevenue(year?: number, month?: number) {
    try {
      const data = await homeService.getRevenue(year, month);
      runInAction(() => {
        this.revenue = data;
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Failed to fetch revenue:", error.message);
      });
    }
  }

  async fetchCurrentBalance(year?: number, month?: number) {
    try {
      const data = await homeService.getCurrentBalance(year, month);
      runInAction(() => {
        this.currentBalance = data;
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Failed to fetch current balance:", error.message);
      });
    }
  }

  async fetchCostBySegment(year?: number, month?: number) {
    try {
      const data = await homeService.getCostBySegment(year, month);
      runInAction(() => {
        this.costBySegment = data;
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Failed to fetch cost by segment:", error.message);
      });
    }
  }

  async fetchRevenueByProject(year?: number, month?: number) {
    try {
      const data = await homeService.getRevenueByProject(year, month);
      runInAction(() => {
        this.revenueByProject = data;
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Failed to fetch revenue by project:", error.message);
      });
    }
  }

  async fetchProfitByProject(year?: number, month?: number) {
    try {
      const data = await homeService.getProfitByProject(year, month);
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
