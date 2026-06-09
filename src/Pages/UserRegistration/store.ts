import { makeAutoObservable, runInAction } from "mobx";
import userService from "../../Services/user";
import { User } from "types/user.interface";

export class UserStore {
  users: User[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUsers() {
    try {
      const data = await userService.getAll();
      runInAction(() => {
        this.users = data;
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Failed to fetch users:", error.message);
      });
    }
  }

  async createUser(payload: any) {
    try {
      const newUser = await userService.create(payload);
      runInAction(() => {
        this.users.push(newUser);
      });
      return true;
    } catch (error: any) {
      runInAction(() => {
        console.error("Failed to create user:", error.message);
      });
      return false;
    }
  }
}

export const userStore = new UserStore();
