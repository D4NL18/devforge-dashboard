import { Graph } from "../types/graph.interface";
import { PaginatedResponse, ProjectFilterParams, ProjectResponse } from "types/project.interface";
import api from "./api";
import { ProjectType } from "types/projectType.interface";

const url = "/graph";
const projectUrl = "/project";

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

  async getProjectDiversificationByType(): Promise<Graph[]> {
    const res = await api.get(`${url}/get-projects-by-type`);
    return res.data.datas || [];
  },

  async getAllProjectTypes(): Promise<ProjectType[]> {
    const res = await api.get("project-type/get-all-project-types");
    return res.data.datas || [];
  },

  async findAll(params: ProjectFilterParams): Promise<PaginatedResponse<ProjectResponse>> {
    const cleanParams: any = {};
    
    if (params.page) cleanParams.page = params.page;
    if (params.limit) cleanParams.limit = params.limit;
    if (params.name) cleanParams.name = params.name;
    if (params.type) cleanParams.type = params.type;

    const res = await api.get(`${projectUrl}`, { params: cleanParams });
    return res.data;
  },
};

export default projectsService;