import { makeAutoObservable, runInAction } from "mobx";
import clientService from "../../Services/client";
import { Customer } from "types/customer.interface";

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

  async createCustomer(customer: Customer) {
    try {
      const newCustomer: Customer = await clientService.create(customer);
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
