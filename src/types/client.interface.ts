import { Address } from "./address.interface";

export interface Client {
  name: string;
  email: string;
  cell: string;
  cpf: string;
  document: string;
  birthday: Date;
  addressRelation?: Address;
  id?: number;
}
