import { Address } from "./address";

export interface User {
    fullName: string;
    userName: string;
    cpf: string;
    email: string;
    phone: string;
    password: string;
    birthDate: Date;
    address: Address
    role: 'admin' | 'user';
}