import api from "./api";
import { Client } from "types/client.interface";

const url = "/client"

const clientService = {
  async getAll(): Promise<Client[]> {
    const response = await api.get(`${url}`);
    return response.data.datas
  },

  async getById(id: string): Promise<Client> {
    const response = await api.get(`${url}/${id}`);
    return response.data.datas
  },

  async create(client: Client): Promise<Client> {
    const response = await api.post(`${url}`, client);
    return response.data.datas
  },

  async update(id: string, client: Client): Promise<Client> {
    const response = await api.put(`${url}/${id}`, client);
    return response.data.datas
  },

  async remove(id: string): Promise<void> {
    await api.delete(`${url}/${id}`);
  },
};

export default clientService;
