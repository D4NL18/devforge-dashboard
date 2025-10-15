import Input from "Components/Input";
import Select from "Components/Select";
import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import CRUDButtons from "Components/CRUD_Buttons";
import { Customer } from "types/customer.interface";
import { Project } from "types/project.interface";
import { ProjectType } from "types/projectType.interface";
import { PaymentMethod } from "types/paymentMethod.interface";
import { LuBadgeDollarSign } from "react-icons/lu";
import { ProjectBudget } from "types/projectBudget.interface";

export default function ProjectRegistration() {
  const api = process.env.REACT_APP_API_URL;

  const [projectName, setProjectName] = useState<string>("");
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );
  const [description, setDescription] = useState<string>("");

  const [complexity, setComplexity] = useState<"Alta" | "Média" | "Baixa" | "">(
    ""
  );
  const [installments, setInstallments] = useState<
    | "À vista"
    | "2x"
    | "3x"
    | "4x"
    | "5x"
    | "6x"
    | "7x"
    | "8x"
    | "9x"
    | "10x"
    | "11x"
    | "12x"
    | ""
  >("");
  const [priority, setPriority] = useState<"Alta" | "Média" | "Baixa" | "">("");
  const [estimate, setEstimate] = useState<string>("");
  const [totalValue, setTotalValue] = useState<number>(0);

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [projectTypes, setProjectTypes] = useState<ProjectType[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [customersRes, projectTypesRes, paymentMethodsRes] =
          await Promise.all([
            fetch(`${api}/client`, { cache: "no-store" }),
            fetch(`${api}/project-type/get-all-project-types`, {
              cache: "no-store",
            }),
            fetch(`${api}/payment-method/get-all-payment-methods`, {
              cache: "no-store",
            }),
          ]);

        if (!customersRes.ok || !projectTypesRes.ok || !paymentMethodsRes.ok) {
          throw new Error("Erro ao carregar dados do servidor");
        }

        const [customersData, projectTypesData, paymentMethodsData] =
          await Promise.all([
            customersRes.json(),
            projectTypesRes.json(),
            paymentMethodsRes.json(),
          ]);

        setCustomers(customersData.datas);
        setProjectTypes(projectTypesData.datas);
        setPaymentMethods(paymentMethodsData.datas);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [api]);

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  if (
    !projectType ||
    !customer ||
    !paymentMethod ||
    !complexity ||
    !installments ||
    !priority ||
    !estimate ||
    !totalValue
  ) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  const payload = {
    name: projectName,
    status: "Em andamento",
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    description,
    projectTypeId: projectType.id,
    clientId: customer.id,
    priority,
    estimation: new Date(estimate),
    complexity,
    totalPrice: totalValue,
    installmentCount:
      installments === "À vista" ? 1 : Number(installments.replace("x", "")),
    statusBudget: "Em aberto",
    notes: description,
    paymentMethodId: paymentMethod.id,
  };

  try {
    const response = await fetch(`${api}/project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro ao cadastrar projeto:", errorData);
      alert(
        `Erro ao cadastrar projeto: ${errorData.message || response.statusText}`
      );
      return;
    }

    alert("Projeto cadastrado com sucesso!");

    setProjectName("");
    setProjectType(null);
    setStartDate("");
    setEndDate("");
    setCustomer(null);
    setPaymentMethod(null);
    setComplexity("");
    setInstallments("");
    setPriority("");
    setEstimate("");
    setTotalValue(0);
    setDescription("");
  } catch (err) {
    console.error("Erro ao enviar requisição:", err);
    alert("Erro ao cadastrar projeto.");
  }
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
            placeholder="Tipo de Projeto"
            options={projectTypes.map((t) => t.description)}
            onSubmit={(value) => {
              const selected =
                projectTypes.find((t) => t.description === value[0]) || null;
              setProjectType(selected);
            }}
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
            options={customers.map((c) => c.name)}
            onSubmit={(value) => {
              const selected =
                customers.find((c) => c.name === value[0]) || null;
              setCustomer(selected);
            }}
          />
        </div>
      </section>

      <section>
        <h2>Informações de Pagamento</h2>
        <div className={styles.inputContainer}>
          <Select
            placeholder="Forma de Pagamento"
            options={paymentMethods.map((p) => p.name)}
            onSubmit={(value) => {
              const selected =
                paymentMethods.find((p) => p.name === value[0]) || null;
              setPaymentMethod(selected);
            }}
          />

          <Select
            placeholder="Complexidade"
            options={["Alta", "Média", "Baixa"]}
            onSubmit={(value) =>
              setComplexity(value[0] as "Alta" | "Média" | "Baixa")
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
              setInstallments(
                value[0] as
                  | "À vista"
                  | "2x"
                  | "3x"
                  | "4x"
                  | "5x"
                  | "6x"
                  | "7x"
                  | "8x"
                  | "9x"
                  | "10x"
                  | "11x"
                  | "12x"
              )
            }
          />

          <Select
            placeholder="Prioridade"
            options={["Alta", "Média", "Baixa"]}
            onSubmit={(value) =>
              setPriority(value[0] as "Alta" | "Média" | "Baixa")
            }
          />

          <Input
            type="date"
            placeholder="Data da Estimativa"
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
