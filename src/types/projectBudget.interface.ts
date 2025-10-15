export interface ProjectBudget {
  priority: string;
  estimation: Date;
  complexity: string;
  totalPrice: number;
  installmentCount: number;
  status: string;
  notes: string;
  clientId: number;
  paymentMethodId: number;
}
