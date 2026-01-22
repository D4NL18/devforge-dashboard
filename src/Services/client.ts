import api from "./api";
import { Client } from "types/client.interface";
import { Graph } from "../types/graph.interface";

const clientUrl = "/client";
const graphUrl = "/graph";

const clientService = {

  async getAll(): Promise<any> {

    const response = await api.get(`${clientUrl}`);

    return response.data;
  },

  async getById(id: string): Promise<Client> {
    const response = await api.get(`${clientUrl}/${id}`);
    return response.data.datas;
  },

  async create(client: Client): Promise<Client> {
    const response = await api.post(`${clientUrl}`, client);
    return response.data.datas;
  },

  async update(id: string, client: Client): Promise<Client> {
    const response = await api.put(`${clientUrl}/${id}`, client);
    return response.data.datas;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`${clientUrl}/${id}`);
  },

  async getClientsLifetimeValueByMonths(year?: number): Promise<Graph[]> {
    const response = await api.get(`${graphUrl}/get-client-lifetime-by-month`, {
      params: { year },
    });
    return response.data.datas;
  },

  async getChurnRevenueByMonth(year?: number): Promise<Graph[]> {
    const response = await api.get(`${graphUrl}/get-churn-revenue-by-month`, {
      params: { year },
    });
    return response.data.datas;
  },

  async getCac(year?: number): Promise<Graph[]> {
    const response = await api.get(`${graphUrl}/get-cac`, {
      params: { year },
    });
    return response.data.datas;
  },
};

export default clientService;