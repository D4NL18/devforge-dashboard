import api from "./api";

let url = "/transaction";

const transactionService = {
  async getDreMetrics(year?: number, month?: number) {
    const response = await api.get(`${url}/get-dre-metrics`, { params: { year, month } });
    return response.data.datas;
  },

  async getBalanceSheet(year?: number, month?: number) {
    const response = await api.get(`${url}/get-balance-sheet`, { params: { year, month } });
    return response.data.datas;
  },

  async getCashFlow(params: any) {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v != null && v !== "")
    );

    const response = await api.get(`${url}/get-cash-flow-values`, { params: cleanParams });
    return response.data.datas;
  },

  async getRevenue(year?: number, month?: number) {
    const response = await api.get(`/graph/card/get-revenue`, { params: { year, month } });
    return response.data.datas;
  },

  async getCurrentBalance(year?: number, month?: number) {
    const response = await api.get(`/graph/card/get-current-balance`, { params: { year, month } });
    return response.data.datas;
  },

  async getCostBySegment(year?: number, month?: number) {
    const response = await api.get(`/graph/get-cost-by-segment`, { params: { year, month } });
    return response.data.datas;
  },

  async getById(id: number) {
    const response = await api.get(`${url}/${id}`);
    return response.data.datas;
  },

  async create(transaction: any) {
    const response = await api.post(`${url}`, transaction);
    return response.data.datas;
  },

  async update(id: number, transaction: any) {
    const response = await api.put(`${url}/${id}`, transaction);
    return response.data.datas;
  },

  async remove(id: number) {
    await api.delete(`${url}/${id}`);
  },
};

export default transactionService;