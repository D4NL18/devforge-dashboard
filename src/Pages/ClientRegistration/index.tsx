import Input from "Components/Input";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import CRUDButtons from "Components/CRUD_Buttons";
import { Address } from "types/address.interface";
import AddressForm from "Components/AddressForm";
import { observer } from "mobx-react-lite";
import { clientStore } from "./store";
import { useNavigate, useParams } from "react-router-dom";

function ClientRegistration() {
  const {
    createClient,
    fetchClientById,
    updateClient,
    currentClient,
    clearCurrentClient,
  } = clientStore;

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;

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

  useEffect(() => {
    if (id) {
      fetchClientById(id);
    }
    return () => {
      clearCurrentClient();
    };
  }, [id, fetchClientById, clearCurrentClient]);

  useEffect(() => {
    if (currentClient && isEditing) {
      setName(currentClient.name || "");
      setEmail(currentClient.email || "");
      setPhone(currentClient.cell || "");
      setDocument(currentClient.document || currentClient.cpf || "");
      
      if (currentClient.birthday) {
        setBirthDate(new Date(currentClient.birthday).toISOString().split("T")[0]);
      }

      setAddress({
        cep: currentClient.code || "",
        city: currentClient.city || "",
        state: currentClient.state || "",
        country: currentClient.country || "",
        street: currentClient.street || "",
        number: currentClient.number || "",
        complement: currentClient.complement || "",
      });
    }
  }, [currentClient, isEditing]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      name,
      email,
      cell: phone,
      cpf: document,
      document: document,
      birthday: new Date(birthDate),
      code: address.cep,
      city: address.city,
      state: address.state,
      country: address.country,
      street: address.street,
      number: address.number,
      complement: address.complement,
    };

    try {
      if (isEditing && id) {
        await updateClient(id, payload as any);
        navigate(-1);
      } else {
        await createClient(payload as any);
        navigate(-1);
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  }

  return (
    <form className={styles.clientForm} onSubmit={handleSubmit}>
      <h1>{isEditing ? "Editar Cliente" : "Cadastro de Cliente"}</h1>
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
        <CRUDButtons onCancel={() => navigate(-1)} />
      </div>
    </form>
  );
}

export default observer(ClientRegistration);