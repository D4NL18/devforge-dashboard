import { 
  ForgotPasswordPayload, 
  LoginPayload, 
  ResetPasswordPayload, 
  TokenResponse 
} from "types/login.interface";
import api from "./api";

const url = "/auth";

const authService = {
  async login(user: LoginPayload): Promise<TokenResponse> {
    const res = await api.post<TokenResponse>(`${url}/login`, user);
    return res.data;
  },

  async forgotPassword(payload: ForgotPasswordPayload): Promise<boolean> {
    await api.post(`${url}/change-password/send-email`, payload);
    return true;
  },

  async resetPassword(payload: ResetPasswordPayload): Promise<any> {
    const res = await api.patch(`${url}/change-password`, payload);
    return res.data;
  }
};

export default authService;