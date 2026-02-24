import { makeAutoObservable, runInAction } from "mobx";
import transactionService from "../../Services/transaction";
import projectService from "../../Services/projects";

export class TransactionStore {
  transactions: any[] = [];
  projects: any[] = [];

  currentTransaction: any | null = null;
  isLoading: boolean = false;

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

  fetchTransactionById = async (id: number) => {
    this.isLoading = true;
    try {
      const data = await transactionService.getById(id);
      runInAction(() => {
        this.currentTransaction = data;
        this.isLoading = false;
      });
    } catch (error: any) {
      runInAction(() => {
        console.error("Erro ao buscar transação:", error);
        this.currentTransaction = null;
        this.isLoading = false;
      });
    }
  };

  clearCurrentTransaction = () => {
    this.currentTransaction = null;
  };

  createTransaction = async (transaction: any) => {
    try {
      const newTransaction = await transactionService.create(transaction);
      runInAction(() => {
        alert("Transação cadastrada com sucesso!");
        this.transactions.push(newTransaction);
      });
    } catch (error: any) {
      alert("Erro ao criar transação.");
      console.error("Erro ao criar transação:", error.message);
    }
  };

  updateTransaction = async (id: number, transaction: any) => {
    try {
      await transactionService.update(id, transaction);
      alert("Transação atualizada com sucesso!");
    } catch (error: any) {
      alert("Erro ao atualizar transação.");
      console.error("Erro ao atualizar:", error);
    }
  };
}

export const transactionStore = new TransactionStore();