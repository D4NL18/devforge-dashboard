import Select from "Components/Select";
import styles from "./index.module.scss";
import Chart from "Components/Chart";
import PaginatedTable, { TableRowBase } from "Components/PaginatedTable";
import RangeInput from "Components/RangeInput";
import AddButton from "Components/AddButton";
import Searchbar from "Components/Searchbar";
import { useEffect, useState } from "react";
import { projectsStore } from "./store";
import { toJS } from "mobx";
import { Graph } from "types/graph.interface";

export default function ProjectsDashboard() {
  const [revenueMin, setRevenueMin] = useState(0);
  const [revenueMax, setRevenueMax] = useState(10000);
  const [prizeMin, setPrizeMin] = useState(0);
  const [prizeMax, setPrizeMax] = useState(10);

  const [marginByProject, setMarginByProject] = useState<Graph[]>([]);
  const [marginByProjectType, setMarginByProjectType] = useState<Graph[]>([]);
  const [revenueByProject, setRevenueByProject] = useState<Graph[]>([]);
  const [profitByProject, setProfitByProject] = useState<Graph[]>([]);
  const [revenueByProjectType, setRevenueByProjectType] = useState<Graph[]>([]);
  const [profitByProjectType, setProfitByProjectType] = useState<Graph[]>([]);

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

  useEffect(() => {
    const fetchData = async () => {
      await projectsStore.fetchMarginByProject();

      const rawMarginByProject = toJS(projectsStore.marginByProject);
      const formattedMarginByProject: Graph[] = rawMarginByProject.map(
        (item: Graph) => ({
          name: item.name,
          value: Number(item.value ? item.value.toFixed(2) : 0),
        })
      );
      setMarginByProject(formattedMarginByProject);

      await projectsStore.fetchMarginByProjectType();

      const rawMarginByProjectType = toJS(projectsStore.marginByProjectType);
      const formattedMarginByProjectType: Graph[] = rawMarginByProjectType.map(
        (item: Graph) => ({
          name: item.name,
          value: Number(item.value ? item.value.toFixed(2) : 0),
        })
      );
      setMarginByProjectType(formattedMarginByProjectType);

      await projectsStore.fetchRevenueByProject();

      const rawRevenueByProject = toJS(projectsStore.revenueByProject);
      const formattedRevenueByProject: Graph[] = rawRevenueByProject.map(
        (item: Graph) => ({
          name: item.name,
          value: Number(item.value ? item.value.toFixed(2) : 0),
        })
      );
      setRevenueByProject(formattedRevenueByProject);

      await projectsStore.fetchProfitByProject();

      const rawProfitByProject = toJS(projectsStore.profitByProject);
      const formattedProfitByProject: Graph[] = rawProfitByProject.map(
        (item: Graph) => ({
          name: item.name,
          value: Number(item.value ? item.value.toFixed(2) : 0),
        })
      );
      setProfitByProject(formattedProfitByProject);

      await projectsStore.fetchRevenueByProjectType();

      const rawRevenueByProjectType = toJS(projectsStore.revenueByProjectType);
      const formattedRevenueByProjectType: Graph[] = rawRevenueByProjectType.map(
        (item: Graph) => ({
          name: item.name,
          value: Number(item.value ? item.value.toFixed(2) : 0),
        })
      );
      setRevenueByProjectType(formattedRevenueByProjectType);

      await projectsStore.fetchProfitByProjectType();

      const rawProfitByProjectType = toJS(projectsStore.profitByProjectType);
      const formattedProfitByProjectType: Graph[] = rawProfitByProjectType.map(
        (item: Graph) => ({
          name: item.name,
          value: Number(item.value ? item.value.toFixed(2) : 0),
        })
      );
      setProfitByProjectType(formattedProfitByProjectType);

    };

    

    fetchData();
  }, []);

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
            data={marginByProject}
            dataKey="value"
            nameKey="name"
            title="Margem por Projeto (%)"
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
            data={profitByProjectType}
            dataKey="value"
            nameKey="name"
            title="Lucro por Tipo de Projeto"
          />
        </div>
        <div className={styles.chartColumn}>
          <Chart
            type="bar"
            data={marginByProjectType}
            dataKey="value"
            nameKey="name"
            title="Margem por Tipo de Projeto (%)"
          />
          <Chart
            type="bar"
            data={revenueByProject}
            dataKey="value"
            nameKey="name"
            title="Faturamento por Projeto"
          />
          <Chart
            type="bar"
            data={profitByProject}
            dataKey="value"
            nameKey="name"
            title="Lucro por Projeto"
          />
          <Chart
            type="bar"
            data={revenueByProjectType}
            dataKey="value"
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
