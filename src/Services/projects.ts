import { Graph } from "../types/graph.interface";
import { PaginatedResponse, ProjectFilterParams, ProjectResponse } from "types/project.interface";
import api from "./api";
import { ProjectType } from "types/projectType.interface";

const url = "/graph";
const projectUrl = "/project";

const projectsService = {


  async getMarginByProject(year?: number): Promise<Graph[]> {
    const res = await api.get(`${url}/get-margin-by-project`, {
        params: { year }
    });
    return res.data.datas || [];
  },

  async getMarginByProjectType(year?: number): Promise<Graph[]> {
    const res = await api.get(`${url}/get-margin-by-type`, {
        params: { year }
    });
    return res.data.datas || [];
  },

  async getRevenueByProject(year?: number): Promise<Graph[]> {
    const res = await api.get(`${url}/get-revenue-by-project`, {
        params: { year }
    });
    return res.data.datas || [];
  },

  async getProfitByProject(year?: number): Promise<Graph[]> {
    const res = await api.get(`${url}/get-profit-by-project`, {
        params: { year }
    });
    return res.data.datas || [];
  },

  async getRevenueByProjectType(year?: number): Promise<Graph[]> {
     // Atenção: Validar se este endpoint existe no backend com suporte a filtro
    const res = await api.get(`${url}/get-revenue-by-type`, {
        params: { year }
    });
    return res.data.datas || [];
  },

  async getProfitByProjectType(year?: number): Promise<Graph[]> {
    const res = await api.get(`${url}/get-profit-by-type`, {
        params: { year }
    });
    return res.data.datas || [];
  },

  async getProjectDiversificationByType(year?: number): Promise<Graph[]> {
    const res = await api.get(`${url}/get-projects-by-type`, {
        params: { year }
    });
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
    if (params.year) cleanParams.year = params.year;

    const res = await api.get(`${projectUrl}`, { params: cleanParams });
    return res.data;
  },
};

export default projectsService;