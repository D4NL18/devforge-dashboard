export interface Address {
    cep: string;
    city: string;
    state: string;
    country: string;
    street: string;
    number: string;
    complement?: string;
    id?: number;
}