import { Graph } from "types/graph.interface";
import api from "./api";

const url = "/graph";

const homeService = {
  async getRevenue(year?: number, month?: number): Promise<Graph> {
    const res = await api.get(`${url}/card/get-revenue`, {
      params: { year, month },
    });
    return res.data.datas || { name: "", value: 0 };
  },

  async getCurrentBalance(year?: number, month?: number): Promise<string> {
    const res = await api.get(`${url}/card/get-current-balance`, {
      params: { year, month },
    });
    return res.data.datas.value || "0,00";
  },

  async getCostBySegment(year?: number, month?: number): Promise<Graph[]> {
    const res = await api.get(`${url}/get-cost-by-segment`, {
      params: { year, month },
    });
    return res.data.datas || { name: "", value: 0 };
  },

  async getRevenueByProject(year?: number, month?: number): Promise<Graph[]> {
    const res = await api.get(`${url}/get-revenue-by-project`, {
      params: { year, month },
    });
    return res.data.datas || { name: "", value: 0 };
  },

  async getProfitByProject(year?: number, month?: number): Promise<Graph[]> {
    const res = await api.get(`${url}/get-profit-by-project`, {
      params: { year, month },
    });
    return res.data.datas || { name: "", value: 0 };
  },
};

export default homeService;
