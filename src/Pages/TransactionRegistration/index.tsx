import Input from "Components/Input";
import Select from "Components/Select";
import styles from "./index.module.scss";
import { useState } from "react";
import CRUDButtons from "Components/CRUD_Buttons";

export default function TransactionRegistration() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [cashFlowValue, setCashFlowValue] = useState("");
  const [flowType, setFlowType] = useState<"entrada" | "saida" | "">("");

  const [dreValue, setDreValue] = useState("");
  const [dreCategory, setDreCategory] = useState("");

  const [balanceCategory, setBalanceCategory] = useState("");

  const [description, setDescription] = useState("");

  function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  if (!flowType) {
    alert("Selecione o tipo de fluxo.");
    return;
  }

  if (!dreCategory) {
    alert("Selecione a categoria DRE.");
    return;
  }

  if (!balanceCategory) {
    alert("Selecione a categoria do Balanço.");
    return;
  }

  const newTransaction = {
    title,
    date: new Date(date),
    cashFlowValue,
    flowType,
    dreValue,
    dreCategory,
    balanceCategory,
    description,
  };

  console.log("Transação cadastrada:", newTransaction);
}

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
