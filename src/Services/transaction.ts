import api from "./api";
// Assumindo que o DTO/tipo esteja disponível em "types"
// import { Transaction } from "types/transaction.interface";
// import { CreateTransactionDTO } in "types/transaction.dto";

// Na ausência dos tipos, 'any' será usado para a replicação da estrutura
let url = "/transaction"; // Endpoint inferido para transações

const transactionService = {
  async getAll(): Promise<any[]> {
    const response = await api.get(`${url}`);
    return response.data;
  },

  async getById(id: string): Promise<any> {
    const response = await api.get(`${url}/${id}`);
    return response.data;
  },

  async create(transaction: any): Promise<any> {
    const response = await api.post(`${url}`, transaction);
    return response.data;
  },

  async update(id: string, transaction: any): Promise<any> {
    const response = await api.put(`${url}${id}`, transaction);
    return response.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`${url}/${id}`);
  },
};

export default transactionService;