import { Address } from "./address.interface";

export interface Client {
  name: string;
  email: string;
  phone: string;
  document: string;
  birthDate: Date;
  address: Address
  id: number;
}