import { makeAutoObservable, runInAction } from "mobx";
import authService from "Services/auth";
import { LoginPayload } from "types/login.interface";

export class LoginStore {
  email = "";
  password = "";
  isLoading = false;
  error = "";

  constructor() {
    makeAutoObservable(this);
  }

  setEmail(email: string) {
    this.email = email;
  }

  setPassword(password: string) {
    this.password = password;
  }

  async login(): Promise<boolean> {
    this.error = "";
    
    this.isLoading = true;

    try {
      const payload: LoginPayload = {
        email: this.email,
        password: this.password,
      };

      const data = await authService.login(payload);

      runInAction(() => {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        
        this.isLoading = false;
      });

      return true;

    } catch (error: any) {
      runInAction(() => {
        this.error = "Email ou Senha inválidos";
        this.isLoading = false;
      });
      
      return false;
    }
  }
}

export const loginStore = new LoginStore();