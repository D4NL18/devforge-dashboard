import Input from "Components/Input";
import styles from "./index.module.scss";
import { useState } from "react";
import CRUDButtons from "Components/CRUD_Buttons";
import { Address } from "types/address.interface";
import { userStore } from "./store";
import Select from "Components/Select";
import AddressForm from "Components/AddressForm";

export default function UserRegistration() {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"admin" | "user" | undefined>(undefined);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [address, setAddress] = useState<Address>({
    cep: "",
    city: "",
    state: "",
    country: "",
    street: "",
    number: "",
    complement: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!role) {
      alert("Selecione uma permissão para o usuário.");
      return;
    }
    if (passwordError || confirmPasswordError) {
      alert("Formulário inválido");
      return;
    }

    const payload = {
      fullName,
      userName,
      email,
      phone,
      cpf,
      birthDate: new Date(birthDate),
      password,
      role,
      cep: address.cep,
      city: address.city,
      state: address.state,
      country: address.country,
      street: address.street,
      number: address.number,
      complement: address.complement,
    };

    const success = await userStore.createUser(payload);

    if (success) {
      alert("Usuário cadastrado com sucesso!");
      resetForm();
    } else {
      alert(`Erro ao cadastrar usuário`);
    }
  }

  function resetForm() {
    setFullName("");
    setUserName("");
    setEmail("");
    setPhone("");
    setCpf("");
    setBirthDate("");
    setPassword("");
    setConfirmPassword("");
    setRole(undefined);
    setAddress({
      cep: "",
      city: "",
      state: "",
      country: "",
      street: "",
      number: "",
      complement: "",
    });
  }

  function validatePassword(value: string) {
    if (!value) return;

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
            options={["Administrador", "Usuário"]}
            onSubmit={(value) =>
              setRole(value[0] === "Administrador" ? "admin" : "user")
            }
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
