import Input from "Components/Input";
import styles from "./index.module.scss";
import { useState } from "react";
import CRUDButtons from "Components/CRUD_Buttons";
import { Customer } from "types/customer.interface";
import { Address } from "types/address.interface";
import AddressForm from "Components/AddressForm";

export default function CustomerRegistration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [document, setDocument] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState<Address>({
    cep: "",
    city: "",
    state: "",
    country: "",
    street: "",
    number: "",
    complement: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newCustomer: Customer = {
      name,
      email,
      phone,
      document,
      birthDate: new Date(birthDate),
      address,
      id: 0
    };

    console.log("Cliente cadastrado:", newCustomer);
  }

  return (
    <form className={styles.customerForm} onSubmit={handleSubmit}>
      <h1>Cadastro de Cliente</h1>
      <section>
        <h2>Informações Pessoais e Profissionais</h2>
        <div className={styles.inputContainer}>
          <Input
            type="text"
            placeholder="Nome Completo"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
          <Input
            type="text"
            placeholder="Documento"
            value={document}
            onChange={(e) => {
              setDocument(e.target.value);
            }}
            required
          />
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <Input
            type="text"
            placeholder="Telefone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            required
          />
          <Input
            type="date"
            placeholder="Data de Nascimento"
            value={birthDate}
            onChange={(e) => {
              setBirthDate(e.target.value);
            }}
            required
          />
        </div>
      </section>
      <AddressForm onChange={setAddress} />
      <div className={styles.buttonContainer}>
        <CRUDButtons onCancel={() => console.log("Cancelado")} />
      </div>
    </form>
  );
}
