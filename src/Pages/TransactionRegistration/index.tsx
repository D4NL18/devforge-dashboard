"use client";

import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { transactionStore } from "./store";
import Input from "Components/Input";
import Select from "Components/Select";
import styles from "./index.module.scss";
import CRUDButtons from "Components/CRUD_Buttons";

function TransactionRegistration() {
  const { createTransaction, fetchData } = transactionStore;

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [cashFlowValue, setCashFlowValue] = useState("");
  const [flowType, setFlowType] = useState<"entrada" | "saida" | "">("");

  const [dreValue, setDreValue] = useState("");
  const [dreCategory, setDreCategory] = useState("");

  const [balanceCategory, setBalanceCategory] = useState("");

  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("");

  const [project, setProject] = useState<string | null >(null);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!flowType || !dreCategory || !balanceCategory || !category) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }
    
    const selectedProjectObj = transactionStore.projects.find(p => p.name === project);
    
    const payload = {
      title,
      transactionDate: new Date(date),
      transactionAmount: parseFloat(cashFlowValue),
      transactionType: flowType,
      dreValue: parseFloat(dreValue),
      dreType: dreCategory,
      balanceType: balanceCategory,
      transactionDetails: description,
      category,
      projectId: selectedProjectObj ? selectedProjectObj.id : null
    };

    await createTransaction(payload as any);
  }

  const projectOptions = transactionStore.projects.map((proj) => ({
    label: proj.name,
    value: proj.id
  }));

  return (
    <form className={styles.transactionForm} onSubmit={handleSubmit}>
      <h1>Cadastro de Transação</h1>

      <section>
        <h2>Informações da Transação</h2>
        <div className={styles.inputContainer}>
          <Input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Input
            type="date"
            placeholder="Data"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <Input
            type="number"
            placeholder="Valor (Fluxo de Caixa)"
            value={cashFlowValue}
            onChange={(e) => setCashFlowValue(e.target.value)}
            required
          />
          <Select
            placeholder="Tipo de Fluxo"
            options={["Entrada", "Saída"]}
            onSubmit={(value) =>
              setFlowType(value[0] === "Entrada" ? "entrada" : "saida")
            }
          />
          <Select
            placeholder="Categoria da Transação"
            options={[
              "Recursos Humanos",
              "Infraestrutura e Equipamentos",
              "Projetos",
              "Administrativo e Financeiro",
              "Marketing e Comercial",
              "Pesquisa e Inovação",
            ]}
            onSubmit={(value) => setCategory(value[0])}
          />
          {category === "Projetos" &&
          <Select
            placeholder="Projeto Associado"
            options={projectOptions.map((proj) => proj.label)}
            onSubmit={(value) => setProject(value[0])}
          />
          }
        </div>
      </section>

      <section>
        <h2>Informações DRE</h2>
        <div className={styles.inputContainer}>
          <Input
            type="number"
            placeholder="Valor (DRE)"
            value={dreValue}
            onChange={(e) => setDreValue(e.target.value)}
            required
          />
          <Select
            placeholder="Categoria DRE"
            options={[
              "Receitas Brutas",
              "Imposto sobre Receita",
              "Custos de Projeto",
              "Despesas Operacionais Desembolsáveis",
              "Despesas de Depreciação",
              "Despesas Financeiras",
              "Imposto de Renda",
            ]}
            onSubmit={(value) => setDreCategory(value[0])}
          />
        </div>
      </section>

      <section>
        <h2>Informações Balanço Patrimonial</h2>
        <div className={styles.inputContainer}>
          <Select
            placeholder="Categoria do Balanço"
            options={[
              "Contas a receber",
              "Imobilizado",
              "Depreciação acumulada",
              "Empréstimos",
              "Contas a Pagar",
              "Impostos a Pagar",
              "IR a pagar",
              "Capital",
              "Reservas de Lucros",
            ]}
            onSubmit={(value) => setBalanceCategory(value[0])}
          />
        </div>
      </section>

      <section>
        <h2>Descrição</h2>
        <div className={styles.inputContainer}>
          <textarea
            className={styles.textarea}
            placeholder="Descrição da Transação"
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

export default observer(TransactionRegistration);