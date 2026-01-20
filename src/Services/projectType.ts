import api from "./api";
import { ProjectType } from "types/projectType.interface";

const url = "/project-type"

const projectTypeService = {
  async getAll(): Promise<ProjectType[]> {
    const res = await api.get(`${url}/get-all-project-types`);
    return res.data.datas;
  },
};

export default projectTypeService;
