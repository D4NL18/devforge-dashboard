import api from "./api";
import { Customer } from "types/customer.interface";

const clientService = {
  async getAll(): Promise<Customer[]> {
    const response = await api.get("/clients");
    return response.data;
  },

  async getById(id: string): Promise<Customer> {
    const response = await api.get(`/clients/${id}`);
    return response.data;
  },

  async create(customer: Customer): Promise<Customer> {
    const response = await api.post("/clients", customer);
    return response.data;
  },

  async update(id: string, customer: Customer): Promise<Customer> {
    const response = await api.put(`/clients/${id}`, customer);
    return response.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/clients/${id}`);
  },
};

export default clientService;
