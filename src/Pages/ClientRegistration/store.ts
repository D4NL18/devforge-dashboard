import { makeAutoObservable, runInAction } from "mobx";
import clientService from "../../Services/client";
import { Client } from "types/client.interface";

export class ClientStore {
  constructor() {
    makeAutoObservable(this);
  }

  public clients: Client[] = [];
  public currentClient: any | null = null;
  public isLoading: boolean = false;

  async fetchClients() {
    try {
      const data = await clientService.getAll();
      runInAction(() => {
        this.clients = data;
      });
    } catch (error: any) {
      runInAction(() => {
        console.log(error);
      });
    } finally {
      runInAction(() => {});
    }
  }

  fetchClientById = async (id: string) => {
    this.isLoading = true;
    try {
      const data = await clientService.getById(id);
      runInAction(() => {
        this.currentClient = data;
        this.isLoading = false;
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Erro ao buscar cliente:", error);
        this.currentClient = null;
        this.isLoading = false;
      });
    }
  };

  clearCurrentClient = () => {
    this.currentClient = null;
  };

  createClient = async (client: Client) => {
    try {
      const newClient = await clientService.create(client);
      runInAction(() => {
        console.log(newClient);
        this.clients.push(newClient);
      });
      alert("Cliente cadastrado com sucesso!");
    } catch (error: any) {
      alert("Erro ao criar cliente.");
      console.error("Erro ao criar cliente:", error.message);
    }
  };

  updateClient = async (id: string, client: Client) => {
    try {
      await clientService.update(id, client);
      alert("Cliente atualizado com sucesso!");
    } catch (error: any) {
      alert("Erro ao atualizar cliente.");
      console.error("Erro ao atualizar:", error);
    }
  };
}

export const clientStore = new ClientStore();