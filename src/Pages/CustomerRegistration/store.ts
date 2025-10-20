import { makeAutoObservable, runInAction } from "mobx";
import clientService from "../../Services/client";
import { Customer } from "types/customer.interface";

export class CustomerStore {
  constructor() {
    makeAutoObservable(this);
  }

  public customers: Customer[] = [];
  public loading = false;
  public error: string | null = null;

  async fetchCustomers() {
    this.loading = true;
    this.error = null;
    try {
      const data = await clientService.getAll();
      runInAction(() => {
        this.customers = data;
      });
    } catch (error: any) {
      runInAction(() => {
        this.error = error.message;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async createCustomer(customer: Customer) {
    this.loading = true;
    this.error = null;
    try {
      const newCustomer = await clientService.create(customer);
      runInAction(() => {
        this.customers.push(newCustomer);
      });
    } catch (error: any) {
      runInAction(() => {
        this.error = error.message;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

export const customerStore = new CustomerStore();
