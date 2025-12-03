import { makeAutoObservable, runInAction } from "mobx";
import projectsService from "Services/projects";
import { Graph } from "types/graph.interface";
import { ProjectResponse } from "types/project.interface"; 
import { ProjectType } from "types/projectType.interface";

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
  projectDiversificationByType: Graph[] = [];
  allProjectTypes: ProjectType[] = [];

  projectsList: ProjectResponse[] = []; 
  totalItems: number = 0; 
  isLoadingTable: boolean = false;
  
  filters = {
    page: 1, 
    limit: 8, 
    name: "",
    type: undefined as number | undefined,
    revenueMin: 0,
    revenueMax: 10000,
  };

  debounceTimer: any = null;

  async fetchMarginByProject() {
    try {
      const data = await projectsService.getMarginByProject();
      runInAction(() => {
        this.marginByProject = data || []; 
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Failed to fetch margin by project:", error.message);
        this.marginByProject = [];
      });
    }
  }

  async fetchMarginByProjectType() {
    try {
      const data = await projectsService.getMarginByProjectType();
      runInAction(() => {
        this.marginByProjectType = data || [];
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Failed to fetch margin by type:", error.message);
        this.marginByProjectType = [];
      });
    }
  }

  async fetchRevenueByProject() {
    try {
      const data = await projectsService.getRevenueByProject();
      runInAction(() => {
        this.revenueByProject = data || [];
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Failed to fetch revenue by project:", error.message);
        this.revenueByProject = [];
      });
    }
  }

  async fetchProfitByProject() {
    try {
      const data = await projectsService.getProfitByProject();
      runInAction(() => {
        this.profitByProject = data || [];
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Failed to fetch profit by project:", error.message);
        this.profitByProject = [];
      });
    }
  }

  async fetchRevenueByProjectType() {
    try {
      const data = await projectsService.getRevenueByProjectType();
      const safeData = data || []; 
      const adaptedData: Graph[] = safeData.map((item: any) => ({
        name: item.type || "Unknown",
        value: item.revenue || 0,
      }));

      runInAction(() => {
        this.revenueByProjectType = adaptedData;
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Failed to fetch revenue by type:", error.message);
        this.revenueByProjectType = [];
      });
    }
  }

  async fetchProfitByProjectType() {
    try {
      const data = await projectsService.getProfitByProjectType();
      runInAction(() => {
        this.profitByProjectType = data || [];
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Failed to fetch profit by type:", error.message);
        this.profitByProjectType = [];
      });
    }
  }

  async fetchProjectDiversificationByType() {
    try {
      const data = await projectsService.getProjectDiversificationByType();
      runInAction(() => {
        this.projectDiversificationByType = data || [];
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Failed to fetch profit by type:", error.message);
        this.projectDiversificationByType = [];
      });
    }
  }

  async fetchAllProjectTypes() {
    try {
      const data = await projectsService.getAllProjectTypes();
      runInAction(() => {
        this.allProjectTypes = data || [];
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Failed to fetch project types:", error.message);
        this.projectDiversificationByType = [];
      });
    }
  }

  async fetchProjects() {
    this.isLoadingTable = true;
    try {
      const params = {
        page: this.filters.page,
        limit: this.filters.limit,
        name: this.filters.name,
        type: this.filters.type,
      };

      const response = await projectsService.findAll(params);

      runInAction(() => {
        this.projectsList = response?.datas || []; 
        this.totalItems = response?.totalResponseItens || 0;
        this.isLoadingTable = false;
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Failed to fetch projects:", error);
        this.projectsList = [];
        this.totalItems = 0;
        this.isLoadingTable = false;
      });
    }
  }

  setFilter(key: keyof typeof this.filters, value: any) {
    (this.filters as any)[key] = value;

    if (key === 'page') {
        this.fetchProjects();
        return; 
    }

    if (key !== 'limit') {
        this.filters.page = 1;
    }

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      this.fetchProjects();
    }, 1000);
  }

  setPage(pageIndex: number) {
      this.setFilter('page', pageIndex + 1); 
  }
}

export const projectsStore = new ProjectsDashboardStore();