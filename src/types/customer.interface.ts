import { Address } from "./address.interface";

export interface Customer {
  name: string;
  email: string;
  cell: string;
  cpf: string;
  document: string;
  birthday: Date;
  address: Address
}