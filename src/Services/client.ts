import api from "./api";
import { Customer } from "types/customer.interface";

const url = "/client"

const clientService = {
  async getAll(): Promise<Customer[]> {
    const response = await api.get(`${url}`);
    return response.data.datas
  },

  async getById(id: string): Promise<Customer> {
    const response = await api.get(`${url}/${id}`);
    return response.data.datas
  },

  async create(client: Customer): Promise<Customer> {
    const response = await api.post(`${url}`, client);
    return response.data.datas
  },

  async update(id: string, client: Customer): Promise<Customer> {
    const response = await api.put(`${url}/${id}`, client);
    return response.data.datas
  },

  async remove(id: string): Promise<void> {
    await api.delete(`${url}/${id}`);
  },
};

export default clientService;