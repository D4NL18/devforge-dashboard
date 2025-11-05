import Select from "Components/Select";
import styles from "./index.module.scss";
import Chart from "Components/Chart";
import PaginatedTable, { TableRowBase } from "Components/PaginatedTable";
import RangeInput from "Components/RangeInput";
import AddButton from "Components/AddButton";
import Searchbar from "Components/Searchbar";
import { useState } from "react";

export default function ProjectsDashboard() {
  const [revenueMin, setRevenueMin] = useState(0);
  const [revenueMax, setRevenueMax] = useState(10000);
  const [prizeMin, setPrizeMin] = useState(0);
  const [prizeMax, setPrizeMax] = useState(10);

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

  const margemPorProjeto = [
    { name: "Landing XP", valor: 32000 },
    { name: "AppGo", valor: 28000 },
    { name: "DataDash", valor: 41000 },
    { name: "ShopEase", valor: 35000 },
    { name: "HealthTrack", valor: 26000 },
    { name: "EduPortal", valor: 39000 },
  ];

  const margemPorTipo = [
    { name: "Landing Page", valor: 31000 },
    { name: "Mobile", valor: 27000 },
    { name: "Dashboard", valor: 40000 },
  ];

  const faturamentoPorProjeto = [
    { name: "Landing XP", valor: 120000 },
    { name: "AppGo", valor: 95000 },
    { name: "DataDash", valor: 160000 },
    { name: "ShopEase", valor: 135000 },
    { name: "HealthTrack", valor: 102000 },
    { name: "EduPortal", valor: 145000 },
  ];

  const lucroPorProjeto = [
    { name: "Landing XP", valor: 40000 },
    { name: "AppGo", valor: 35000 },
    { name: "DataDash", valor: 60000 },
    { name: "ShopEase", valor: 48000 },
    { name: "HealthTrack", valor: 32000 },
    { name: "EduPortal", valor: 52000 },
  ];

  const lucroPorTipo = [
    { name: "Landing Page", valor: 38000 },
    { name: "Mobile", valor: 42000 },
    { name: "Dashboard", valor: 56000 },
  ];

  const faturamentoPorTipo = [
    { name: "Landing Page", valor: 115000 },
    { name: "Mobile", valor: 98000 },
    { name: "Dashboard", valor: 155000 },
  ];

  const projectTypeDiversification = [
    { name: "Customer 1", value: 32 },
    { name: "Customer 2", value: 27 },
    { name: "Customer 3", value: 18 },
    { name: "Customer 4", value: 23 },
  ];

  type ProjectRow = TableRowBase & {
    projeto: string;
    tipoProjeto: string;
    faturamento: string;
    prazo: number;
  };

  const projectsData: ProjectRow[] = [
    {
      projeto: 'Project "TecnoParts"',
      tipoProjeto: "Landing Page",
      faturamento: "R$ XX,XX",
      prazo: 8,
    },
    {
      projeto: "Instagram ADs",
      tipoProjeto: "Dashboard",
      faturamento: "R$ XX,XX",
      prazo: 8,
    },
    {
      projeto: 'Project "TecnoParts"',
      tipoProjeto: "Landing Page",
      faturamento: "R$ XX,XX",
      prazo: 8,
    },
    {
      projeto: "Instagram ADs",
      tipoProjeto: "Dashboard",
      faturamento: "R$ XX,XX",
      prazo: 8,
    },
    {
      projeto: 'Project "TecnoParts"',
      tipoProjeto: "Landing Page",
      faturamento: "R$ XX,XX",
      prazo: 8,
    },
    {
      projeto: "Instagram ADs",
      tipoProjeto: "Dashboard",
      faturamento: "R$ XX,XX",
      prazo: 8,
    },
    {
      projeto: 'Project "TecnoParts"',
      tipoProjeto: "Landing Page",
      faturamento: "R$ XX,XX",
      prazo: 8,
    },
    {
      projeto: "Instagram ADs",
      tipoProjeto: "Dashboard",
      faturamento: "R$ XX,XX",
      prazo: 8,
    },
  ];

  return (
    <div className={styles.projectsDashboardContainer}>
      <h1>Projetos</h1>
      <section className={styles.filterSection}>
        <Select
          options={years}
          selectAll
          multiple
          hasSearch
          placeholder="Filtrar por: Ano"
        />
      </section>
      <section className={styles.chartsSection}>
        <div className={styles.chartColumn}>
          <Chart
            type="bar"
            data={margemPorProjeto}
            dataKey="valor"
            nameKey="name"
            title="Margem por Projeto"
          />
          <Chart
            type="pie"
            data={projectTypeDiversification}
            dataKey="value"
            nameKey="name"
            title="Diversificação por Tipo de Projeto"
            colors={["#233662", "#6C72D3", "#63B3ED", "#C8A2C8"]}
            height={500}
          />
          <Chart
            type="bar"
            data={lucroPorTipo}
            dataKey="valor"
            nameKey="name"
            title="Lucro por Tipo de Projeto"
          />
        </div>
        <div className={styles.chartColumn}>
          <Chart
            type="bar"
            data={margemPorTipo}
            dataKey="valor"
            nameKey="name"
            title="Margem por Tipo de Projeto"
          />
          <Chart
            type="bar"
            data={faturamentoPorProjeto}
            dataKey="valor"
            nameKey="name"
            title="Faturamento por Projeto"
          />
          <Chart
            type="bar"
            data={lucroPorProjeto}
            dataKey="valor"
            nameKey="name"
            title="Lucro por Projeto"
          />
          <Chart
            type="bar"
            data={faturamentoPorTipo}
            dataKey="valor"
            nameKey="name"
            title="Faturamento por Tipo de Projeto"
          />
        </div>
      </section>
      <section className={styles.tableSection}>
        <div className={styles.tableFiltersContainer}>
          <Searchbar placeholder="Buscar nome do projeto..." />
          <Select
            placeholder="Filtrar por: Tipo"
            options={["Landing Page", "Dashboard", "Mobile App"]}
          />
          <div className={styles.rangeContainerProjects}>
            <RangeInput
              valueMin={revenueMin}
              valueMax={revenueMax}
              onChangeMin={(e) => setRevenueMin(Number(e.target.value))}
              onChangeMax={(e) => setRevenueMax(Number(e.target.value))}
            />
          </div>
          <div className={styles.rangeContainerProjects}>
            <RangeInput
              valueMin={prizeMin}
              valueMax={prizeMax}
              onChangeMin={(e) => setPrizeMin(Number(e.target.value))}
              onChangeMax={(e) => setPrizeMax(Number(e.target.value))}
            />
          </div>
          <div className={styles.addContainer}>
            <AddButton onClick={() => console.log("clicked")} />
          </div>
        </div>

        <div className={styles.tableContentContainer}>
          <PaginatedTable
            data={projectsData}
            columns={[
              { key: "projeto", label: "Projeto" },
              { key: "tipoProjeto", label: "Tipo de Projeto" },
              { key: "faturamento", label: "Faturamento" },
              { key: "prazo", label: "Prazo" },
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
