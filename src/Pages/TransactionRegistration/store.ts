import { makeAutoObservable, runInAction } from "mobx";
import transactionService from "../../Services/transaction";
import projectService from "../../Services/projects";

export class TransactionStore {
  transactions: any[] = [];
  projects: any[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  fetchData = async () => {
    try {
      const projects = await projectService.getAll();

      runInAction(() => {
        if (projects.length > 0) {
          this.projects = projects;
        }
      });
    } catch (error: any) {
      console.error("Erro ao buscar dados:", error.message);
    }
  };

  createTransaction = async (transaction: any) => {
    try {
      const newTransaction = await transactionService.create(transaction);
      runInAction(() => {
        alert("Transação cadastrada com sucesso!");
        this.transactions.push(newTransaction);
      });
    } catch (error: any) {
      console.error("Erro ao criar transação:", error.message);
    }
  };
}

export const transactionStore = new TransactionStore();
