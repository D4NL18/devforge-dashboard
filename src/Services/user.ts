import api from "./api";
import { User } from "types/user.interface";

const url = "/users";

const userService = {
  async getAll(): Promise<User[]> {
    const res = await api.get(`${url}`);
    return res.data.datas || [];
  },

  async getById(id: string): Promise<User> {
    const res = await api.get(`${url}/${id}`);
    return res.data;
  },

  async create(user: User): Promise<User> {
    const res = await api.post(`${url}`, user);
    return res.data;
  },

  async update(id: string, user: User): Promise<User> {
    const res = await api.put(`${url}/${id}`, user);
    return res.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`${url}/${id}`);
  },
};

export default userService;
