import { makeAutoObservable, runInAction } from "mobx";
import projectService from "../../Services/project";
import clientService from "../../Services/client";
import projectTypeService from "../../Services/projectType";
import paymentMethodService from "../../Services/paymentMethod";
import { Project } from "types/project.interface";
import { Client } from "types/client.interface";
import { ProjectType } from "types/projectType.interface";
import { PaymentMethod } from "types/paymentMethod.interface";

export class ProjectStore {
  projects: Project[] = [];
  clients: Client[] = [];
  projectTypes: ProjectType[] = [];
  paymentMethods: PaymentMethod[] = [];

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

  createProject = async (project: Project) => {
    try {
      const newProject = await projectService.create(project);
      runInAction(() => {
        this.projects.push(newProject);
      });
    } catch (error: any) {
      console.error("Erro ao criar projeto:", error.message);
    }
  };
}

export const projectStore = new ProjectStore();
