import api from "./api";
import { ProjectBudget } from "types/projectBudget.interface";

const url = "/project-budget"

const projectBudgetService = {
  async getAll(): Promise<ProjectBudget[]> {
    const res = await api.get(`${url}`);
    return res.data.datas;
  },
};

export default projectBudgetService;
