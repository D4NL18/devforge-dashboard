import { LoginPayload, TokenResponse } from "types/login.interface";
import api from "./api";

const url = "/auth";

const authService = {
  async login(user: LoginPayload): Promise<TokenResponse> {
    const res = await api.post<TokenResponse>(`${url}/login`, user);
    
    return res.data;
  },
};

export default authService;