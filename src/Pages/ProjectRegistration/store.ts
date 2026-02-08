import { makeAutoObservable, runInAction } from "mobx";
import clientService from "../../Services/client";
import projectTypeService from "../../Services/projectType";
import paymentMethodService from "../../Services/paymentMethod";
import projectsService from "../../Services/projects";
import { Project, ProjectResponse } from "types/project.interface";
import { Client } from "types/client.interface";
import { ProjectType } from "types/projectType.interface";
import { PaymentMethod } from "types/paymentMethod.interface";

export class ProjectStore {
  projects: Project[] = [];
  clients: Client[] = [];
  projectTypes: ProjectType[] = [];
  paymentMethods: PaymentMethod[] = [];
  
  currentProject: ProjectResponse | null = null;
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchData = async () => {
    try {
      const [clients, projectTypes, paymentMethods] = await Promise.all([
        clientService.getAll(),
        projectTypeService.getAll(),
        paymentMethodService.getAll(),
      ]);

      runInAction(() => {
        this.clients = clients;
        this.projectTypes = projectTypes;
        this.paymentMethods = paymentMethods;
      });
    } catch (error: any) {
      console.error("Erro ao buscar dados:", error.message);
    }
  };

  fetchProjectById = async (id: number) => {
    this.isLoading = true;
    try {
      const data = await projectsService.getById(id);
      runInAction(() => {
        this.currentProject = data;
        this.isLoading = false;
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Erro ao buscar projeto:", error);
        this.currentProject = null;
        this.isLoading = false;
      });
    }
  };

  clearCurrentProject = () => {
    this.currentProject = null;
  };

  createProject = async (project: Project) => {
    try {
      const newProject = await projectsService.create(project);
      runInAction(() => {
        this.projects.push(newProject as any); 
      });
      alert("Projeto cadastrado com sucesso!");
    } catch (error: any) {
      alert("Erro ao criar projeto.");
      console.error("Erro ao criar projeto:", error.message);
    }
  };

  updateProject = async (id: number, project: Project) => {
    try {
        await projectsService.update(id, project);
        alert("Projeto atualizado com sucesso!");
    } catch (error: any) {
        alert("Erro ao atualizar projeto.");
        console.error("Erro ao atualizar:", error);
    }
  };
}

export const projectStore = new ProjectStore();