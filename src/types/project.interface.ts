import { Customer } from "./customer.interface";

export interface Project {
  projectName: string;
  category: "Landing Page" | "Mobile" | "Dashboard";
  startDate: Date;
  endDate: Date;
  customer: Customer;
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
  estimate: string;
  totalValue: number;
  description: string;
}