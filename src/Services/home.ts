import { Graph } from "types/graph.interface";
import api from "./api";

const url = "/graph";

const homeService = {
  async getRevenue(): Promise<Graph> {
    const res = await api.get(`${url}/card/get-revenue`);
    return res.data.datas || { name: "", value: 0 };
  },

  async getCurrentBalance(): Promise<string> {
    const res = await api.get("/transaction/get-current-balance");
    return res.data.datas || "0,00";
  },

  async getCostBySegment(): Promise<Graph[]> {
    const res = await api.get(`${url}/get-cost-by-segment`);
    return res.data.datas || { name: "", value: 0 };
  },

  async getRevenueByProject(): Promise<Graph[]> {
    const res = await api.get(`${url}/get-revenue-by-project`);
    return res.data.datas || { name: "", value: 0 };
  },

  async getProfitByProject(): Promise<Graph[]> {
    const res = await api.get(`${url}/get-profit-by-project`);
    return res.data.datas || { name: "", value: 0 };
  },
};

export default homeService;
