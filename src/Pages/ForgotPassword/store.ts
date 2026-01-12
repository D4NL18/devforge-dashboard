// src/store/resetPassword.store.ts
import { makeAutoObservable, runInAction } from "mobx";
import authService from "Services/auth";

export class ResetPasswordStore {
  isLoading = false;
  error = "";
  emailSentSuccess = false;

  constructor() {
    makeAutoObservable(this);
  }

  async sendEmail(email: string): Promise<boolean> {
    this.isLoading = true;
    this.error = "";
    this.emailSentSuccess = false;

    try {
      await authService.forgotPassword({ email });
      
      runInAction(() => {
        this.isLoading = false;
        this.emailSentSuccess = true;
      });
      return true;
    } catch (error: any) {
      runInAction(() => {
        this.isLoading = false;
        this.error = "Erro ao enviar e-mail. Verifique se o endereço está correto.";
      });
      return false;
    }
  }

  async resetPassword(password: string, token: string): Promise<boolean> {
    this.isLoading = true;
    this.error = "";

    try {
      await authService.resetPassword({ password, token });
      runInAction(() => {
        this.isLoading = false;
      });
      return true;
    } catch (error: any) {
      runInAction(() => {
        this.isLoading = false;
        this.error = "Erro ao redefinir senha. O link pode ter expirado.";
      });
      return false;
    }
  }
}

export const resetPasswordStore = new ResetPasswordStore();