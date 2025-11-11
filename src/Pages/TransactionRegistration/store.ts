import { makeAutoObservable, runInAction } from "mobx";
import transactionService from "../../Services/transaction";
import projectService from "../../Services/project"; // Para buscar a lista de projetos
// import { Transaction } from "types/transaction.interface";
// import { Project } from "types/project.interface";

export class TransactionStore {
  transactions: any[] = []; // Substituir 'any' pelo tipo 'Transaction'
  projects: any[] = []; // Substituir 'any' pelo tipo 'Project'

  constructor() {
    makeAutoObservable(this);
  }

  fetchData = async () => {
    try {
      // Busca dados necessários para os dropdowns, como projetos
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
        this.transactions.push(newTransaction);
      });
    } catch (error: any) {
      console.error("Erro ao criar transação:", error.message);
    }
  };
}

export const transactionStore = new TransactionStore();
