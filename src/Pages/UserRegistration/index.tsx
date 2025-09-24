import Input from "Components/Input";
import styles from "./index.module.scss";
import { useState } from "react";
import CRUDButtons from "Components/CRUD_Buttons";
import { Address } from "types/address";
import { User } from "types/user.interface";
import Select from "Components/Select";

export default function UserRegistration() {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cep, setCep] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [role, setRole] = useState<"admin" | "user">("user");

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (passwordError || confirmPasswordError) {
      console.log("Formulário inválido");
      return;
    }

    const address: Address = {
      cep,
      city,
      state,
      country,
      street,
      number,
      complement,
    };

    const newUser: User = {
      fullName,
      userName,
      email,
      phone,
      cpf,
      birthDate: new Date(birthDate),
      address,
      password,
      role,
    };

    console.log("Usuário cadastrado:", newUser);
  }

  function validatePassword(value: string) {

    if(!value) {
        return
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!regex.test(value)) {
      setPasswordError(
        "A senha deve ter pelo menos 8 caracteres, incluindo 1 letra maiúscula, 1 minúscula e 1 número."
      );
    } else {
      setPasswordError("");
    }
  }

  function validateConfirmPassword(value: string) {
    if (value !== password) {
      setConfirmPasswordError("As senhas não coincidem!");
    } else {
      setConfirmPasswordError("");
    }
  }

  return (
    <form className={styles.userForm} onSubmit={handleSubmit}>
      <h1>Cadastro de Usuário</h1>
      <section>
        <h2>Informações Pessoais e Profissionais</h2>
        <div className={styles.inputContainer}>
          <Input
            type="text"
            placeholder="Nome Completo"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Nome de Usuário"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className={styles.inputWrapper}>
            <Input
              type="password"
              placeholder="Nova Senha"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              required
            />
            {passwordError && (
              <p className={styles.errorMessage}>{passwordError}</p>
            )}
          </div>

          <div className={styles.inputWrapper}>
            <Input
              type="password"
              placeholder="Confirme a Senha"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                validateConfirmPassword(e.target.value);
              }}
              required
            />
            {confirmPasswordError && (
              <p className={styles.errorMessage}>{confirmPasswordError}</p>
            )}
          </div>

          <Input
            type="date"
            placeholder="Data de Nascimento"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <Select
            placeholder="Permissão"
            defaultValue={1}
            options={["Administrador", "Usuário"]}
            onSubmit={(value) =>
              setRole(value[0] === "Administrador" ? "admin" : "user")
            }
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
            onChange={(e) => setCep(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Estado"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="País"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Rua"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </div>
        <div className={styles.numberComplementContainer}>
          <Input
            type="text"
            placeholder="Número"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Complemento"
            value={complement}
            onChange={(e) => setComplement(e.target.value)}
            required
          />
        </div>
      </section>

      <div className={styles.buttonContainer}>
        <CRUDButtons onCancel={() => console.log("Cancelado")} />
      </div>
    </form>
  );
}
