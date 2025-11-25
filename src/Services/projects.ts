import { Graph } from "../types/graph.interface";
import api from "./api";

const url = "/graph";

const projectsService = {

  async getMarginByProject(): Promise<Graph[]> {
    const res = await api.get(`${url}/get-margin-by-project`);
    return res.data.datas || [];
  },

  async getMarginByProjectType(): Promise<Graph[]> {
    const res = await api.get(`${url}/get-margin-by-type`);
    return res.data.datas || [];
  },

  async getRevenueByProject(): Promise<Graph[]> {
    const res = await api.get(`${url}/get-revenue-by-project`);
    return res.data.datas || [];
  },

  async getProfitByProject(): Promise<Graph[]> {
    const res = await api.get(`${url}/get-profit-by-project`);
    return res.data.datas || [];
  },

  async getRevenueByProjectType(): Promise<Graph[]> {
    const res = await api.get(`${url}/get-revenue-by-type`);
    return res.data.datas || [];
  },

  async getProfitByProjectType(): Promise<Graph[]> {
    const res = await api.get(`${url}/get-profit-by-type`);
    return res.data.datas || [];
  },

};

export default projectsService;