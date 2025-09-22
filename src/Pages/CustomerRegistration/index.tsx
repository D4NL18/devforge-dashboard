import Input from "Components/Input";
import styles from "./index.module.scss";
import { useState } from "react";
import CRUDButtons from "Components/CRUD_Buttons";
import { Customer } from "types/customer.interface";

export default function CustomerRegistration() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [document, setDocument] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [cep, setCep] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newCustomer: Customer = {
      fullName,
      email,
      phone,
      document,
      birthDate: new Date(birthDate),
      cep,
      city,
      state,
      country,
      street,
      number,
      complement,
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
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
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
      <section>
        <h2>Endereço</h2>
        <div className={styles.inputContainer}>
          <Input
            type="text"
            placeholder="CEP"
            value={cep}
            onChange={(e) => {
              setCep(e.target.value);
            }}
            required
          />
          <Input
            type="text"
            placeholder="Cidade"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            required
          />
          <Input
            type="text"
            placeholder="Estado"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
            }}
            required
          />
          <Input
            type="text"
            placeholder="País"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            required
          />
          <Input
            type="text"
            placeholder="Rua"
            value={street}
            onChange={(e) => {
              setStreet(e.target.value);
            }}
            required
          />
        </div>
        <div className={styles.numberComplementContainer}>
          <Input
            type="text"
            placeholder="Número"
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
            }}
            required
          />
          <Input
            type="text"
            placeholder="Complemento"
            value={complement}
            onChange={(e) => {
              setComplement(e.target.value);
            }}
            required
          />
        </div>
      </section>
      <div className={styles.buttonContainer}>
        <CRUDButtons
          onCancel={() => console.log("Cancelado")}/>
      </div>
    </form>
  );
}
