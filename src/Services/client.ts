import api from "./api";
import { Client } from "types/client.interface";
import { Graph } from "../types/graph.interface";

// Definimos a URL base para as operações de CRUD de Clientes
const clientUrl = "/client";
// Definimos a URL base para as operações de Gráficos (Baseado no seu GraphController)
const graphUrl = "/graph";

const clientService = {
  // Alterei a assinatura para aceitar 'params'.
  // Isso permite passar { page, limit, name, years, etc } vindo da Store.
  async getAll(): Promise<any> {
    // Passamos o objeto 'params' como segundo argumento do axios/api.
    // O axios converte automaticamente { page: 1, name: "Gui" } para "?page=1&name=Gui"
    const response = await api.get(`${clientUrl}`);
    
    // Retornamos response.data para pegar tanto a lista ('datas') quanto o total ('totalResponseItens')
    // se o backend retornar estrutura paginada.
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

  // --- MÉTODOS DE GRÁFICOS ---
  // Note que agora usamos 'graphUrl' e passamos o 'year' via params

  // Backend: @Get("get-client-lifetime-by-month") @Query("year")
  async getClientsLifetimeValueByMonths(year?: number): Promise<Graph[]> {
    const response = await api.get(`${graphUrl}/get-client-lifetime-by-month`, {
      // Se 'year' for undefined, o axios envia sem o parametro.
      // Se tiver valor, ele monta: /graph/get-client-lifetime-by-month?year=2025
      params: { year },
    });
    return response.data.datas;
  },

  // Backend: @Get("get-churn-revenue-by-month") @Query("year")
  async getChurnRevenueByMonth(year?: number): Promise<Graph[]> {
    const response = await api.get(`${graphUrl}/get-churn-revenue-by-month`, {
      params: { year },
    });
    return response.data.datas;
  },

  // Backend: @Get("get-cac") @Query("year")
  async getCac(year?: number): Promise<Graph[]> {
    const response = await api.get(`${graphUrl}/get-cac`, {
      params: { year },
    });
    return response.data.datas;
  },
};

export default clientService;