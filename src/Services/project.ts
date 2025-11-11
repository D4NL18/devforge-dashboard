import api from "./api";
import { Project } from "types/project.interface";

let url = "/project";

const projectService = {
  async getAll(): Promise<Project[]> {
    const response = await api.get(`${url}?limit=999&page=1`);
    return response.data.datas;
  },

  async getById(id: string): Promise<Project> {
    const response = await api.get(`${url}/${id}`);
    return response.data;
  },

  async create(project: Project): Promise<Project> {
    const response = await api.post(`${url}`, project);
    return response.data;
  },

  async update(id: string, project: Project): Promise<Project> {
    const response = await api.put(`${url}${id}`, project);
    return response.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`${url}/${id}`);
  },
};

export default projectService;
