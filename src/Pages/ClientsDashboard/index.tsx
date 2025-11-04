import Select from "Components/Select";
import styles from "./index.module.scss";
import Chart from "Components/Chart";
import Searchbar from "Components/Searchbar";
import RangeInput from "Components/RangeInput";
import AddButton from "Components/AddButton";
import { useState } from "react";
import PaginatedTable, { TableRowBase } from "Components/PaginatedTable";

export default function ClientsDashboard() {
  const [valueMinAmmount, setValueMinAmmount] = useState(0);
  const [valueMaxAmmount, setValueMaxAmmount] = useState(10000);
  const [valueMinMonths, setValueMinMonths] = useState(0);
  const [valueMaxMonths, setValueMaxMonths] = useState(10000);

  const years = [
    "2025",
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
  ];

  const clientDiversificationData = [
    { name: "Cliente A", value: 32 },
    { name: "Cliente B", value: 27 },
    { name: "Cliente C", value: 23 },
    { name: "Cliente D", value: 18 },
  ];

  const delinquencyData = [
    { name: "Em atraso", value: 32 },
    { name: "Em dia", value: 68 },
  ];

  const churnRevenueData = [
    { name: "Jan", value: 5.2 },
    { name: "Fev", value: 4.8 },
    { name: "Mar", value: 5.5 },
    { name: "Abr", value: 6.1 },
    { name: "Mai", value: 5.9 },
    { name: "Jun", value: 6.3 },
    { name: "Jul", value: 5.7 },
    { name: "Ago", value: 5.1 },
    { name: "Set", value: 4.9 },
    { name: "Out", value: 5.0 },
    { name: "Nov", value: 5.4 },
    { name: "Dez", value: 5.8 },
  ];

  const cacData = [
    { name: "Jan", value: 320 },
    { name: "Fev", value: 300 },
    { name: "Mar", value: 350 },
    { name: "Abr", value: 310 },
    { name: "Mai", value: 290 },
    { name: "Jun", value: 275 },
    { name: "Jul", value: 295 },
    { name: "Ago", value: 305 },
    { name: "Set", value: 315 },
    { name: "Out", value: 330 },
    { name: "Nov", value: 340 },
    { name: "Dez", value: 360 },
  ];

  const ltvData = [
    { name: "Jan", value: 2100 },
    { name: "Fev", value: 2200 },
    { name: "Mar", value: 2250 },
    { name: "Abr", value: 2300 },
    { name: "Mai", value: 2400 },
    { name: "Jun", value: 2450 },
    { name: "Jul", value: 2500 },
    { name: "Ago", value: 2600 },
    { name: "Set", value: 2700 },
    { name: "Out", value: 2800 },
    { name: "Nov", value: 2850 },
    { name: "Dez", value: 2900 },
  ];

  type ClientRow = TableRowBase & {
    cliente: string;
    tipoProjeto: string;
    valorInadimplente: string;
    atraso: number;
  };

  const clientsData: ClientRow[] = [
    {
      cliente: 'Project "TecnoParts"',
      tipoProjeto: "Landing Page",
      valorInadimplente: "R$ XX,XX",
      atraso: 8,
    },
    {
      cliente: "Instagram ADs",
      tipoProjeto: "Dashboard",
      valorInadimplente: "R$ XX,XX",
      atraso: 8,
    },
    {
      cliente: 'Project "TecnoParts"',
      tipoProjeto: "Landing Page",
      valorInadimplente: "R$ XX,XX",
      atraso: 8,
    },
    {
      cliente: "Instagram ADs",
      tipoProjeto: "Dashboard",
      valorInadimplente: "R$ XX,XX",
      atraso: 8,
    },
    {
      cliente: 'Project "TecnoParts"',
      tipoProjeto: "Landing Page",
      valorInadimplente: "R$ XX,XX",
      atraso: 8,
    },
    {
      cliente: "Instagram ADs",
      tipoProjeto: "Dashboard",
      valorInadimplente: "R$ XX,XX",
      atraso: 8,
    },
    {
      cliente: 'Project "TecnoParts"',
      tipoProjeto: "Landing Page",
      valorInadimplente: "R$ XX,XX",
      atraso: 8,
    },
    {
      cliente: "Instagram ADs",
      tipoProjeto: "Dashboard",
      valorInadimplente: "R$ XX,XX",
      atraso: 8,
    },
  ];

  return (
    <div className={styles.clientsDashboardContainer}>
      <h1>Clientes</h1>

      <section className={styles.filtersSection}>
        <Select
          options={years}
          selectAll
          multiple
          hasSearch
          placeholder="Filtrar por: Ano"
        />
      </section>

      <section className={styles.chartsSection}>
        <div className={styles.pieChartsContainer}>
          <Chart
            type="pie"
            data={clientDiversificationData}
            dataKey="value"
            nameKey="name"
            title="Diversificação de Clientes"
            height={400}
          />
          <Chart
            type="pie"
            data={delinquencyData}
            dataKey="value"
            nameKey="name"
            title="Taxa de Inadimplência"
            height={400}
          />
        </div>

        <div className={styles.lineBarChartsContainer}>
          <Chart
            type="bar"
            data={churnRevenueData}
            dataKey="value"
            nameKey="name"
            title="Churn de Receita (%)"
          />
          <Chart
            type="line"
            data={cacData}
            dataKey="value"
            nameKey="name"
            title="Custo de Aquisição de Cliente (CAC)"
          />
          <Chart
            type="line"
            data={ltvData}
            dataKey="value"
            nameKey="name"
            title="Lifetime Value (LTV)"
          />
        </div>
      </section>

      <section className={styles.tableSection}>
        <div className={styles.tableFiltersContainer}>
          <Searchbar />
          <Select
            placeholder="Filtrar por: Tipo"
            options={["Landing Page", "Dashboard", "Mobile App"]}
          />
          <RangeInput
            valueMin={valueMinAmmount}
            valueMax={valueMaxAmmount}
            onChangeMin={(e) => setValueMinAmmount(Number(e.target.value))}
            onChangeMax={(e) => setValueMaxAmmount(Number(e.target.value))}
          />
          <RangeInput
            valueMin={valueMinMonths}
            valueMax={valueMaxMonths}
            onChangeMin={(e) => setValueMinMonths(Number(e.target.value))}
            onChangeMax={(e) => setValueMaxMonths(Number(e.target.value))}
          />
          <div className={styles.addContainer}>
            <AddButton onClick={() => console.log("clicked")} />
          </div>
        </div>

        <div className={styles.tableContentContainer}>
          <PaginatedTable
            data={clientsData}
            columns={[
              { key: "cliente", label: "Cliente" },
              { key: "tipoProjeto", label: "Tipo de Projeto" },
              { key: "valorInadimplente", label: "Valor Inadimplente" },
              { key: "atraso", label: "Atraso" },
            ]}
            rowsPerPage={8}
            edit
            delete
            onEdit={(row) => console.log("Editar:", row)}
            onDelete={(row) => console.log("Excluir:", row)}
          />
        </div>
      </section>
    </div>
  );
}
