import Select from "Components/Select";
import styles from "./index.module.scss";
import CardInfo from "Components/CardInfo";
import Chart from "Components/Chart";
import PaginatedTable from "Components/PaginatedTable";
import Searchbar from "Components/Searchbar";
import RangeInput from "Components/RangeInput";
import { useState } from "react";
import AddButton from "Components/AddButton";
import { useNavigate } from "react-router-dom";

export default function TransactionDashboard() {
  const [valueMin, setValueMin] = useState(0);
  const [valueMax, setValueMax] = useState(10000);

  const navigate = useNavigate();


  const caixaMinimo = 1500;
  const caixaAtual = 1400;
  const faturamento = 5500;
  const lucro = 4500;

  const pieChartData = [
    { name: "Marketing", value: 500 },
    { name: "Equipamentos", value: 300 },
    { name: "Projetos", value: 100 },
    { name: "Impostos", value: 100 },
  ];

  const DRE_Data = [
    { label: "Receita Bruta", value: 10000, bold: true },
    { label: "Imposto Sobre Receitas", value: 2000 },
    { label: "Receita Líquida", value: 8000, bold: true },
    { label: "Custo de Projeto", value: 3000 },
    { label: "Lucro Bruto", value: 1500, bold: true },
    { label: "Despesas Operacionais", value: 2000 },
    { label: "EBITDA", value: 500, bold: true },
    { label: "Depreciação e Amortização", value: 200 },
    { label: "EBIT", value: 300, bold: true },
    { label: "Despesas Financeiras", value: 100 },
    { label: "Lucro Antes do IR", value: 200, bold: true },
    { label: "Imposto de Renda", value: 50 },
    { label: "Lucro Líquido", value: 150, bold: true },
  ];

  const PatrimonialBalanceData = [
    {
      leftLabel: "Caixa",
      leftValor: "R$ 25.000,00",
      rightLabel: "Empréstimos",
      rightValor: "R$ 50.000,00",
    },
    {
      leftLabel: "Contas a Receber",
      leftValor: "R$ 40.000,00",
      rightLabel: "Contas a Pagar",
      rightValor: "R$ 20.000,00",
    },
    {
      leftLabel: "Estoques",
      leftValor: "R$ 35.000,00",
      rightLabel: "Impostos a Pagar",
      rightValor: "R$ 10.000,00",
    },
    {
      leftLabel: "",
      leftValor: "",
      rightLabel: "IR a Pagar",
      rightValor: "R$ 2.000,00",
    },
    {
      leftLabel: "Ativo Circulante",
      leftValor: "R$ 100.000,00",
      rightLabel: "Passivo Circulante",
      rightValor: "R$ 85.000,00",
      bold: true,
    },
    {
      leftLabel: "Imobilizado",
      leftValor: "R$ 150.000,00",
      rightLabel: "Capital",
      rightValor: "R$ 100.000,00",
    },
    {
      leftLabel: "Depreciação Acumulada",
      leftValor: "-R$ 30.000,00",
      rightLabel: "Reservas de Lucro",
      rightValor: "R$ 35.000,00",
    },
    {
      leftLabel: "Ativo Não Circulante",
      leftValor: "R$ 120.000,00",
      rightLabel: "Patrimônio Líquido",
      rightValor: "R$ 135.000,00",
      bold: true,
    },
    {
      leftLabel: "Ativo Total",
      leftValor: "R$ 220.000,00",
      rightLabel: "Passivo + Patrimônio Líquido",
      rightValor: "R$ 220.000,00",
      bold: true,
    },
  ];

  type CashFlowRow = {
    titulo: string;
    categoria: string;
    valor: string;
    type: "in" | "out";
  };

  const CashFlowData: CashFlowRow[] = [
    {
      titulo: "Project 'TecnoParts'",
      categoria: "Project",
      valor: "R$ 12.500,00",
      type: "in",
    },
    {
      titulo: "Instagram ADs",
      categoria: "MKT",
      valor: "R$ 2.300,00",
      type: "out",
    },
    {
      titulo: "Google Ads",
      categoria: "MKT",
      valor: "R$ 1.750,00",
      type: "out",
    },
    {
      titulo: "Venda de Licenças",
      categoria: "Comercial",
      valor: "R$ 6.400,00",
      type: "in",
    },
    {
      titulo: "Serviço de Hospedagem",
      categoria: "Infraestrutura",
      valor: "R$ 950,00",
      type: "out",
    },
    {
      titulo: "Project 'Nova Plataforma'",
      categoria: "Project",
      valor: "R$ 15.200,00",
      type: "in",
    },
    {
      titulo: "Facebook Ads",
      categoria: "MKT",
      valor: "R$ 1.500,00",
      type: "out",
    },
    {
      titulo: "Project 'TecnoParts'",
      categoria: "Project",
      valor: "R$ 12.500,00",
      type: "in",
    },
    {
      titulo: "Consultoria de Software",
      categoria: "Serviços",
      valor: "R$ 8.000,00",
      type: "in",
    },
    {
      titulo: "Google Ads",
      categoria: "MKT",
      valor: "R$ 1.750,00",
      type: "out",
    },
    {
      titulo: "Project 'Nova Plataforma'",
      categoria: "Project",
      valor: "R$ 15.200,00",
      type: "in",
    },
    {
      titulo: "Facebook Ads",
      categoria: "MKT",
      valor: "R$ 1.500,00",
      type: "out",
    },
    {
      titulo: "Project 'TecnoParts'",
      categoria: "Project",
      valor: "R$ 12.500,00",
      type: "in",
    },
    {
      titulo: "Instagram ADs",
      categoria: "MKT",
      valor: "R$ 2.300,00",
      type: "out",
    },
    {
      titulo: "Consultoria de Software",
      categoria: "Serviços",
      valor: "R$ 8.000,00",
      type: "in",
    },
    {
      titulo: "Google Ads",
      categoria: "MKT",
      valor: "R$ 1.750,00",
      type: "out",
    },
    {
      titulo: "Venda de Licenças",
      categoria: "Comercial",
      valor: "R$ 6.400,00",
      type: "in",
    },
    {
      titulo: "Serviço de Hospedagem",
      categoria: "Infraestrutura",
      valor: "R$ 950,00",
      type: "out",
    },
    {
      titulo: "Project 'Nova Plataforma'",
      categoria: "Project",
      valor: "R$ 15.200,00",
      type: "in",
    },
    {
      titulo: "Facebook Ads",
      categoria: "MKT",
      valor: "R$ 1.500,00",
      type: "out",
    },
  ];

  return (
    <div className={styles.transactionDashboardContainer}>
      <h1>Transações</h1>
      <section className={styles.mainInfoSection}>
        <div className={styles.filters}>
          <div className={styles.filterSelectContainer}>
            <Select
              placeholder="Filtrar por: Ano"
              options={["Todos", "2023", "2024", "2025"]}
            ></Select>
          </div>
          <div className={styles.filterSelectContainer}>
            <Select
              placeholder="Filtrar por: Mês"
              options={[
                "Todos",
                "Janeiro",
                "Fevereiro",
                "Março",
                "Abril",
                "Maio",
                "Junho",
                "Julho",
                "Agosto",
                "Setembro",
                "Outubro",
                "Novembro",
                "Dezembro",
              ]}
            ></Select>
          </div>
        </div>
        <div className={styles.infos}>
          <div className={styles.cardInfoBox}>
            <CardInfo
              title="Caixa Mínimo"
              value={`R$ ${caixaMinimo.toFixed(2)}`}
            ></CardInfo>
            <CardInfo
              title="Caixa Atual"
              value={`R$ ${caixaAtual.toFixed(2)}`}
              hasWarning={caixaAtual < caixaMinimo}
            ></CardInfo>
            <CardInfo
              title="Faturamento"
              value={`R$ ${faturamento.toFixed(2)}`}
            ></CardInfo>
            <CardInfo title="Lucro" value={`R$ ${lucro.toFixed(2)}`}></CardInfo>
          </div>
          <div className={styles.pieChartBox}>
            <Chart
              type="pie"
              title="Gastos por Setor"
              data={pieChartData}
              dataKey="value"
              nameKey="name"
            ></Chart>
          </div>
        </div>
      </section>
      <section className={styles.DRESection}>
        <h2>Demonstração do Resultado do Exercício - DRE</h2>
        <PaginatedTable
          data={DRE_Data}
          rowsPerPage={13}
          columns={[
            { key: "label", label: "Métricas" },
            { key: "value", label: "Valores" },
          ]}
        ></PaginatedTable>
      </section>
      <section className={styles.patrimonialBalanceSection}>
        <h2>Balanço Patrimonial</h2>
        <PaginatedTable
          data={PatrimonialBalanceData}
          columns={[
            { key: "leftLabel", label: "Ativos" },
            { key: "leftValor", label: "Valor" },
            { key: "rightLabel", label: "Passivo e PL" },
            { key: "rightValor", label: "Valor" },
          ]}
        ></PaginatedTable>
      </section>
      <section className={styles.cashFlowSection}>
        <h2>Fluxo de Caixa</h2>
        <div className={styles.filterContainer}>
            <Searchbar></Searchbar>
            <Select
              placeholder="Filter by: Category"
              options={["Marketing", "Projetos", "Equipamentos", "Impostos"]}
            ></Select>
            <RangeInput
              valueMin={valueMin}
              valueMax={valueMax}
              onChangeMin={(e) => setValueMin(Number(e.target.value))}
              onChangeMax={(e) => setValueMax(Number(e.target.value))}
            ></RangeInput>
            <Select placeholder="Any" options={["In", "Out"]}></Select>
          <div className={styles.addContainer}>
            <AddButton onClick={() => navigate("/register/transaction")}></AddButton>
          </div>
        </div>
        <PaginatedTable
          data={CashFlowData}
          columns={[
            { key: "titulo", label: "Título" },
            { key: "categoria", label: "Categoria" },
            { key: "valor", label: "Valor" },
          ]}
          inOut
          rowsPerPage={8}
          edit
          delete
          onEdit={(row) => console.log("Editar:", row)}
          onDelete={(row) => console.log("Excluir:", row)}
        ></PaginatedTable>
      </section>
    </div>
  );
}
