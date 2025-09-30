import Input from "Components/Input";
import Select from "Components/Select";
import styles from "./index.module.scss";
import { useState } from "react";
import CRUDButtons from "Components/CRUD_Buttons";
import { Customer } from "types/customer.interface";
import { LuBadgeDollarSign } from "react-icons/lu";
import { Project } from "types/project.interface";

const customers: Customer[] = [
  {
    fullName: "Ana Souza",
    email: "ana.souza@example.com",
    phone: "11999999999",
    document: "123.456.789-00",
    birthDate: new Date("1990-05-14"),
    address: {
      cep: "01001-000",
      city: "São Paulo",
      state: "SP",
      country: "Brasil",
      street: "Rua das Flores",
      number: "100",
    },
  },
  {
    fullName: "Carlos Lima",
    email: "carlos.lima@example.com",
    phone: "21988887777",
    document: "987.654.321-00",
    birthDate: new Date("1985-09-21"),
    address: {
      cep: "20010-000",
      city: "Rio de Janeiro",
      state: "RJ",
      country: "Brasil",
      street: "Av. Atlântica",
      number: "500",
    },
  },
  {
    fullName: "Mariana Oliveira",
    email: "mariana.oliveira@example.com",
    phone: "31977776666",
    document: "456.789.123-00",
    birthDate: new Date("1993-11-02"),
    address: {
      cep: "30140-000",
      city: "Belo Horizonte",
      state: "MG",
      country: "Brasil",
      street: "Rua da Liberdade",
      number: "250",
    },
  },
];

export default function ProjectRegistration() {
  const [projectName, setProjectName] = useState<string>("");
  const [category, setCategory] = useState<Project["category"] | "">("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [customer, setCustomer] = useState<Customer | null>(null);

  const [paymentMethod, setPaymentMethod] = useState<
    Project["paymentMethod"] | ""
  >("");
  const [complexity, setComplexity] = useState<Project["complexity"] | "">("");
  const [installments, setInstallments] = useState<
    Project["installments"] | ""
  >("");
  const [priority, setPriority] = useState<Project["priority"] | "">("");
  const [estimate, setEstimate] = useState<string>("");
  const [totalValue, setTotalValue] = useState<number>(0);
  const [description, setDescription] = useState<string>("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (
      !category ||
      !customer ||
      !paymentMethod ||
      !complexity ||
      !installments ||
      !priority
    ) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const newProject: Project = {
      projectName,
      category: category as Project["category"],
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      customer,
      paymentMethod: paymentMethod as Project["paymentMethod"],
      complexity: complexity as Project["complexity"],
      installments: installments as Project["installments"],
      priority: priority as Project["priority"],
      estimate,
      totalValue,
      description,
    };

    console.log("Projeto cadastrado:", newProject);
  }

  return (
    <form className={styles.projectForm} onSubmit={handleSubmit}>
      <h1>Cadastro de Projeto</h1>

      <section>
        <h2>Informações do Projeto</h2>
        <div className={styles.inputContainer}>
          <Input
            type="text"
            placeholder="Nome do Projeto"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
          <Select
            placeholder="Categoria"
            options={["Landing Page", "Mobile", "Dashboard"]}
            onSubmit={(value) => setCategory(value[0] as Project["category"])}
          />
          <Input
            type="date"
            placeholder="Data de Início"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <Input
            type="date"
            placeholder="Data de Término"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
          <Select
            placeholder="Cliente"
            options={customers.map((c) => c.fullName)}
            onSubmit={(value) => {
              const selectedCustomer =
                customers.find((c) => c.fullName === value[0]) || null;
              setCustomer(selectedCustomer);
            }}
          />
        </div>
      </section>

      <section>
        <h2>Informações de Pagamento</h2>
        <div className={styles.inputContainer}>
          <Select
            placeholder="Forma de Pagamento"
            options={["Cartão de Crédito", "Cartão de Débito", "Boleto", "PIX"]}
            onSubmit={(value) =>
              setPaymentMethod(value[0] as Project["paymentMethod"])
            }
          />
          <Select
            placeholder="Complexidade"
            options={["Alta", "Média", "Baixa"]}
            onSubmit={(value) =>
              setComplexity(value[0] as Project["complexity"])
            }
          />
          <Select
            placeholder="Parcelas"
            options={[
              "À vista",
              "2x",
              "3x",
              "4x",
              "5x",
              "6x",
              "7x",
              "8x",
              "9x",
              "10x",
              "11x",
              "12x",
            ]}
            onSubmit={(value) =>
              setInstallments(value[0] as Project["installments"])
            }
          />
          <Select
            placeholder="Prioridade"
            options={["Alta", "Média", "Baixa"]}
            onSubmit={(value) => setPriority(value[0] as Project["priority"])}
          />
          <Input
            type="text"
            placeholder="Estimativa"
            value={estimate}
            onChange={(e) => setEstimate(e.target.value)}
            required
          />
          <div className={styles.ValueInputContainer}>
            <Input
              type="number"
              placeholder="Valor Total"
              value={String(totalValue)}
              onChange={(e) => setTotalValue(Number(e.target.value))}
              required
            />
            <LuBadgeDollarSign className={styles.dollarIcon} />
          </div>
        </div>
      </section>

      <section>
        <h2>Descrição</h2>
        <div className={styles.inputContainer}>
          <textarea
            className={styles.textarea}
            placeholder="Descrição do Projeto"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
