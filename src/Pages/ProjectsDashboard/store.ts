import { makeAutoObservable, runInAction } from "mobx";
import projectsService from "Services/projects";
import { Graph } from "types/graph.interface";

export class ProjectsDashboardStore {
  constructor() {
    makeAutoObservable(this);
  }

  marginByProject: Graph[] = [];
  marginByProjectType: Graph[] = [];
  revenueByProject: Graph[] = [];
  profitByProject: Graph[] = [];
  revenueByProjectType: Graph[] = [];
  profitByProjectType: Graph[] = [];

  async fetchMarginByProject() {
    try {
      const data = await projectsService.getMarginByProject();
      runInAction(() => {
        this.marginByProject = data;
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Failed to fetch margin by project:", error.message);
      });
    }
  }

  async fetchMarginByProjectType() {
    try {
      const data = await projectsService.getMarginByProjectType();
      runInAction(() => {
        this.marginByProjectType = data;
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Failed to fetch margin by type:", error.message);
      });
    }
  }

  async fetchRevenueByProject() {
    try {
      const data = await projectsService.getRevenueByProject();
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
      const data = await projectsService.getProfitByProject();
      runInAction(() => {
        this.profitByProject = data;
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Failed to fetch profit by project:", error.message);
      });
    }
  }

  async fetchRevenueByProjectType() {
    try {
      const data = await projectsService.getRevenueByProjectType();
      const adaptedData: Graph[] = data.map((item: any) => ({
        name: item.type || "Unknown",
        value: item.revenue || 0, 
      }));

      runInAction(() => {
        this.revenueByProjectType = adaptedData;
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Failed to fetch revenue by type:", error.message);
      });
    }
  }

  async fetchProfitByProjectType() {
    try {
      const data = await projectsService.getProfitByProjectType();
      runInAction(() => {
        this.profitByProjectType = data;
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Failed to fetch profit by type:", error.message);
      });
    }
  }

}

export const projectsStore = new ProjectsDashboardStore();
