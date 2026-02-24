import { makeAutoObservable, runInAction } from "mobx";
import clientService from "../../Services/client";
import { Client } from "types/client.interface";

export class ClientStore {
  constructor() {
    makeAutoObservable(this);
  }

  public clients: Client[] = [];

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
}

export const clientStore = new ClientStore();
