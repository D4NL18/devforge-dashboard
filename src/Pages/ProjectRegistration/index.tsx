import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { projectStore } from "./store";
import Input from "Components/Input";
import Select from "Components/Select";
import CRUDButtons from "Components/CRUD_Buttons";
import styles from "./index.module.scss";
import { LuBadgeDollarSign } from "react-icons/lu";
import { ProjectType } from "types/projectType.interface";
import { Client } from "types/client.interface";
import { PaymentMethod } from "types/paymentMethod.interface";
import { useParams, useNavigate } from "react-router-dom";
import { Project } from "types/project.interface";

function ProjectRegistration() {
  const {
    clients,
    projectTypes,
    paymentMethods,
    fetchData,
    createProject,
    fetchProjectById,
    updateProject,
    currentProject,
    clearCurrentProject,
  } = projectStore;

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;

  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [client, setClient] = useState<Client | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null,
  );
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const [complexity, setComplexity] = useState<"Alta" | "Média" | "Baixa" | "">(
    "",
  );
  const [installments, setInstallments] = useState<string>("");
  const [priority, setPriority] = useState<"Alta" | "Média" | "Baixa" | "">("");

  const [estimate, setEstimate] = useState("");
  const [totalValue, setTotalValue] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (id) {
      fetchProjectById(Number(id));
    }
    return () => {
      clearCurrentProject();
    };
  }, [id, fetchProjectById, clearCurrentProject]);

  useEffect(() => {
    if (currentProject && isEditing) {
      setProjectName(currentProject.name || "");

      if (currentProject.startDate)
        setStartDate(
          new Date(currentProject.startDate).toISOString().split("T")[0],
        );
      if (currentProject.endDate)
        setEndDate(
          new Date(currentProject.endDate).toISOString().split("T")[0],
        );

      if (currentProject.startDate)
        setEstimate(
          new Date(currentProject.startDate).toISOString().split("T")[0],
        );

      setDescription(currentProject.description || "");

      setTotalValue(currentProject.projectBudgetTotalPrice || 0);

      setStatus(currentProject.status || "");

      if (clients.length > 0 && currentProject.clientName) {
        const foundClient = clients.find(
          (c) => c.name === currentProject.clientName,
        );
        if (foundClient) setClient(foundClient);
      }

      if (projectTypes.length > 0 && currentProject.projectTypeDescription) {
        const foundType = projectTypes.find(
          (t) => t.description === currentProject.projectTypeDescription,
        );
        if (foundType) setProjectType(foundType);
      }
    }
  }, [currentProject, isEditing, clients, projectTypes]);

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

    const payload: Project = {
      name: projectName,
      status: status,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      description: description,
      customer: client,
      paymentMethod: paymentMethod.name as
        | "Cartão de Crédito"
        | "Cartão de Débito"
        | "Boleto"
        | "PIX",
      complexity: complexity as "Alta" | "Média" | "Baixa",
      priority: priority as "Alta" | "Média" | "Baixa",
      estimate: estimate,
      totalValue: totalValue,
      installments: installments as any,
    };

    try {
      if (isEditing && id) {
        await updateProject(Number(id), payload);
        navigate(-1);
      } else {
        await createProject(payload);
        navigate(-1);
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  }

  return (
    <form className={styles.projectForm} onSubmit={handleSubmit}>
      <h1>{isEditing ? "Editar Projeto" : "Cadastro de Projeto"}</h1>

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
            placeholder={
              projectType ? projectType.description : "Tipo de Projeto"
            }
            options={projectTypes.map((t) => t.description)}
            onSubmit={(value) =>
              setProjectType(
                projectTypes.find((t) => t.description === value[0]) || null,
              )
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
            placeholder={client ? client.name : "Cliente"}
            options={clients.map((c) => c.name)}
            onSubmit={(value) =>
              setClient(clients.find((c) => c.name === value[0]) || null)
            }
          />

          <Select
            placeholder={status || "Status"}
            options={["Em andamento", "Concluído", "Rejeitado"]}
            onSubmit={(value) => setStatus(value[0])}
          />
        </div>
      </section>

      <section>
        <h2>Informações de Pagamento</h2>
        <div className={styles.inputContainer}>
          <Select
            placeholder={
              paymentMethod ? paymentMethod.name : "Forma de Pagamento"
            }
            options={paymentMethods.map((p) => p.name)}
            onSubmit={(value) =>
              setPaymentMethod(
                paymentMethods.find((p) => p.name === value[0]) || null,
              )
            }
          />

          <Select
            placeholder={complexity || "Complexidade"}
            options={["Alta", "Média", "Baixa"]}
            onSubmit={(value) => setComplexity(value[0] as any)}
          />

          <Select
            placeholder={installments || "Parcelas"}
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
            placeholder={priority || "Prioridade"}
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
        <CRUDButtons onCancel={() => navigate(-1)} />
      </div>
    </form>
  );
}

export default observer(ProjectRegistration);
