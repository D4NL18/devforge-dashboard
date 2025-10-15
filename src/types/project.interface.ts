export interface Project {
  id?: number;
  name: string;
  status: string;
  startDate: Date;
  endDate: Date;
  description?: string;

  projectTypeId: number;
  clientId: number;
  projectBudgetId: number;

}