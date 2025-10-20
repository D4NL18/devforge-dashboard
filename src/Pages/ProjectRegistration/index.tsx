"use client";

import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { projectStore } from "./store";
import Input from "Components/Input";
import Select from "Components/Select";
import CRUDButtons from "Components/CRUD_Buttons";
import styles from "./index.module.scss";
import { LuBadgeDollarSign } from "react-icons/lu";

function ProjectRegistration() {
  const {
    clients,
    projectTypes,
    paymentMethods,
    fetchData,
    createProject,
  } = projectStore;

  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState<any>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [client, setClient] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<any>(null);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [complexity, setComplexity] = useState<"Alta" | "Média" | "Baixa" | "">("");
  const [installments, setInstallments] = useState<string>("");
  const [priority, setPriority] = useState<"Alta" | "Média" | "Baixa" | "">("");
  const [estimate, setEstimate] = useState("");
  const [totalValue, setTotalValue] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (
      !projectType ||
      !client ||
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
      status,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      description,
      projectTypeId: projectType.id,
      clientId: client.id,
      priority,
      estimation: new Date(estimate),
      complexity,
      totalPrice: totalValue,
      installmentCount:
        installments === "À vista" ? 1 : Number(installments.replace("x", "")),
      statusBudget: status,
      notes: description,
      paymentMethodId: paymentMethod.id,
    };

    await createProject(payload as any);
    alert("Projeto cadastrado com sucesso!");
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
            onSubmit={(value) =>
              setProjectType(projectTypes.find((t) => t.description === value[0]) || null)
            }
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
            options={clients.map((c) => c.name)}
            onSubmit={(value) =>
              setClient(clients.find((c) => c.name === value[0]) || null)
            }
          />

          <Select
            placeholder="Status"
            options={["Em andamento", "Concluído", "Pausado", "Cancelado"]}
            onSubmit={(value) => setStatus(value[0])}
          />
        </div>
      </section>

      <section>
        <h2>Informações de Pagamento</h2>
        <div className={styles.inputContainer}>
          <Select
            placeholder="Forma de Pagamento"
            options={paymentMethods.map((p) => p.name)}
            onSubmit={(value) =>
              setPaymentMethod(paymentMethods.find((p) => p.name === value[0]) || null)
            }
          />

          <Select
            placeholder="Complexidade"
            options={["Alta", "Média", "Baixa"]}
            onSubmit={(value) => setComplexity(value[0] as any)}
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
            onSubmit={(value) => setInstallments(value[0])}
          />

          <Select
            placeholder="Prioridade"
            options={["Alta", "Média", "Baixa"]}
            onSubmit={(value) => setPriority(value[0] as any)}
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

export default observer(ProjectRegistration);
