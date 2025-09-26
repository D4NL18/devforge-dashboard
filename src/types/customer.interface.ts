import { Address } from "./address";

export interface Customer {
  fullName: string;
  email: string;
  phone: string;
  document: string;
  birthDate: Date;
  address: Address
}