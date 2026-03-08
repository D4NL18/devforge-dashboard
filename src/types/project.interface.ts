import { Client } from "./client.interface";

export interface Project {
  id?: number;
  name: string;
  status: string;
  startDate: Date;
  endDate: Date;
  customer: Client;
  paymentMethod: "Cartão de Crédito" | "Cartão de Débito" | "Boleto" | "PIX";
  complexity: "Alta" | "Média" | "Baixa";
  installments:
    | "À vista"
    | "2x"
    | "3x"
    | "4x"
    | "5x"
    | "6x"
    | "7x"
    | "8x"
    | "9x"
    | "10x"
    | "11x"
    | "12x";
  priority: "Alta" | "Média" | "Baixa";
  totalValue: number;
  description: string;
}

export interface ProjectFilterParams {
  page?: number;
  limit?: number;
  type?: number;
  name?: string;
  revenue?: number;
  minRevenue?: number; 
  maxRevenue?: number;
  year?: number;
}

export interface ProjectResponse {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  projectTypeDescription: string;
  clientName: string;
  projectBudgetTotalPrice: number;
  paymentMethodId?: number;
  complexity?: "Alta" | "Média" | "Baixa";
  priority?: "Alta" | "Média" | "Baixa";
  installmentCount?: number;
}
export interface PaginatedResponse<T> {
  datas: T[];
  countResponseItens: number;
  totalResponseItens: number;
}