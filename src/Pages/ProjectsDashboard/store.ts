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
    year: undefined as number | undefined,
  };

  debounceTimer: any = null;

  async fetchMarginByProject() {
    try {
      const data = await projectsService.getMarginByProject(this.filters.year);
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
      const data = await projectsService.getMarginByProjectType(
        this.filters.year,
      );
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
      const data = await projectsService.getRevenueByProject(this.filters.year);
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
      const data = await projectsService.getProfitByProject(this.filters.year);
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
      const data = await projectsService.getRevenueByProjectType(
        this.filters.year,
      );
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
      const data = await projectsService.getProfitByProjectType(
        this.filters.year,
      );
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
      const data = await projectsService.getProjectDiversificationByType(
        this.filters.year,
      );
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
        year: this.filters.year,
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

  async deleteProject(id: number) {
    try {
      await projectsService.delete(id);

      await this.fetchProjects();

      this.fetchGraphs();

      alert("Projeto excluído com sucesso!");
    } catch (error: any) {
      console.error("Erro ao excluir projeto:", error);
      alert("Não foi possível excluir o projeto.");
    }
  }

  async fetchGraphs() {
    await this.fetchMarginByProject();
    await this.fetchMarginByProjectType();
    await this.fetchRevenueByProject();
    await this.fetchProfitByProject();
    await this.fetchRevenueByProjectType();
    await this.fetchProfitByProjectType();
    await this.fetchProjectDiversificationByType();
  }

  setFilter(key: keyof typeof this.filters, value: any) {
    (this.filters as any)[key] = value;

    if (key === "page") {
      this.fetchProjects();
      return;
    }

    if (key !== "limit") {
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
    this.setFilter("page", pageIndex + 1);
  }
}

export const projectsStore = new ProjectsDashboardStore();
