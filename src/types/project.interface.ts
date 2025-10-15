import { Customer } from "./customer.interface";
import { PaymentMethod } from "./paymentMethod.interface";
import { ProjectType } from "./projectType.interface";

export interface Project {
  projectName: string;
  projectType: ProjectType;
  startDate: Date;
  endDate: Date;
  customer: Customer;
  paymentMethod: PaymentMethod
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