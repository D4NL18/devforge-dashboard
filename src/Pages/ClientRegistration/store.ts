import { makeAutoObservable, runInAction } from "mobx";
import clientService from "../../Services/client";
import { Customer } from "types/customer.interface";
import { Client } from "types/client.interface";

export class CustomerStore {
  constructor() {
    makeAutoObservable(this);
  }

  public customers: Customer[] = [];

  async fetchCustomers() {
    try {
      const data = await clientService.getAll();
      runInAction(() => {
        this.customers = data;
      });
    } catch (error: any) {
      runInAction(() => {
        console.log(error);
      });
    } finally {
      runInAction(() => {});
    }
  }

  async createCustomer(client: Client) {
    try {
      const newCustomer: Client = await clientService.create(client);
      runInAction(() => {
        this.customers.push(newCustomer);
      });
      alert("Cliente cadastrado com sucesso!");
    } catch (error: any) {
      alert("Erro ao criar cliente.");
      console.error("Erro ao criar cliente:", error.message);
    }
  }
}

export const customerStore = new CustomerStore();
