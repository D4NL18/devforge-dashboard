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
import { observer } from "mobx-react-lite";
import { Graph } from "types/graph.interface";
import { ProjectType } from "types/projectType.interface";
import { useNavigate } from "react-router-dom";

const ProjectsDashboard = observer(() => {
  const { filters, projectsList } = projectsStore;

  const years = [
    "2025",
    "2024",
  ];

  const [marginByProject, setMarginByProject] = useState<Graph[]>([]);
  const [marginByProjectType, setMarginByProjectType] = useState<Graph[]>([]);
  const [revenueByProject, setRevenueByProject] = useState<Graph[]>([]);
  const [profitByProject, setProfitByProject] = useState<Graph[]>([]);
  const [revenueByProjectType, setRevenueByProjectType] = useState<Graph[]>([]);
  const [profitByProjectType, setProfitByProjectType] = useState<Graph[]>([]);
  const [projectDiversificationByType, setProjectDiversificationByType] =
    useState<Graph[]>([]);

  const [projectTypeOptions, setProjectTypeOptions] = useState<string[]>([]);
  const [fullProjectTypes, setFullProjectTypes] = useState<ProjectType[]>([]);

  const navigate = useNavigate();

  const fetchGraphs = async () => {
      await projectsStore.fetchMarginByProject();
      const rawMarginByProject = toJS(projectsStore.marginByProject) || [];
      const formattedMarginByProject: Graph[] = rawMarginByProject.map(
        (item: Graph) => ({
          name: item.name,
          value: Number(item.value ? item.value.toFixed(2) : 0),
        })
      );
      setMarginByProject(formattedMarginByProject);

      await projectsStore.fetchMarginByProjectType();
      const rawMarginByProjectType =
        toJS(projectsStore.marginByProjectType) || [];
      const formattedMarginByProjectType: Graph[] = rawMarginByProjectType.map(
        (item: Graph) => ({
          name: item.name,
          value: Number(item.value ? item.value.toFixed(2) : 0),
        })
      );
      setMarginByProjectType(formattedMarginByProjectType);

      await projectsStore.fetchRevenueByProject();
      const rawRevenueByProject = toJS(projectsStore.revenueByProject) || [];
      const formattedRevenueByProject: Graph[] = rawRevenueByProject.map(
        (item: Graph) => ({
          name: item.name,
          value: Number(item.value ? item.value.toFixed(2) : 0),
        })
      );
      setRevenueByProject(formattedRevenueByProject);

      await projectsStore.fetchProfitByProject();
      const rawProfitByProject = toJS(projectsStore.profitByProject) || [];
      const formattedProfitByProject: Graph[] = rawProfitByProject.map(
        (item: Graph) => ({
          name: item.name,
          value: Number(item.value ? item.value.toFixed(2) : 0),
        })
      );
      setProfitByProject(formattedProfitByProject);

      await projectsStore.fetchRevenueByProjectType();
      const rawRevenueByProjectType =
        toJS(projectsStore.revenueByProjectType) || [];
      const formattedRevenueByProjectType: Graph[] =
        rawRevenueByProjectType.map((item: Graph) => ({
          name: item.name,
          value: Number(item.value ? item.value.toFixed(2) : 0),
        }));
      setRevenueByProjectType(formattedRevenueByProjectType);

      await projectsStore.fetchProfitByProjectType();
      const rawProfitByProjectType =
        toJS(projectsStore.profitByProjectType) || [];
      const formattedProfitByProjectType: Graph[] = rawProfitByProjectType.map(
        (item: Graph) => ({
          name: item.name,
          value: Number(item.value ? item.value.toFixed(2) : 0),
        })
      );
      setProfitByProjectType(formattedProfitByProjectType);

      await projectsStore.fetchProjectDiversificationByType();
      const rawProjectDiversificationByType =
        toJS(projectsStore.projectDiversificationByType) || [];
      const ProjectDiversificationByType: Graph[] =
        rawProjectDiversificationByType.map((item: Graph) => ({
          name: item.name,
          value: Number(item.value ? item.value.toFixed(2) : 0),
        }));
      setProjectDiversificationByType(ProjectDiversificationByType);
  }

  useEffect(() => {
    projectsStore.fetchProjects();
    
    const fetchTypes = async () => {
        await projectsStore.fetchAllProjectTypes();
        const types = toJS(projectsStore.allProjectTypes) || [];
        setFullProjectTypes(types);
        setProjectTypeOptions(types.map((pt) => pt.description));
    }
    fetchTypes();
  }, []);

  useEffect(() => {
    fetchGraphs();
  }, [filters.year]);


  type ProjectRow = TableRowBase & {
    id: number;
    projeto: string;
    tipoProjeto: string;
    faturamento: string;
    prazo: string;
  };

  const tableData: ProjectRow[] = (projectsList || []).map((p) => ({
    id: p.id,
    projeto: p.name,
    tipoProjeto: p.projectTypeDescription,
    faturamento: `R$ ${p.projectBudgetTotalPrice?.toFixed(2) || "0.00"}`,
    prazo: new Date(p.endDate).toLocaleDateString(),
  }));

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    projectsStore.setFilter("name", e.target.value);
  };

  const handleYearSubmit = (selectedValues: string[]) => {
    if (selectedValues.length > 0) {
        const selectedYear = Number(selectedValues[0]);
        if (!isNaN(selectedYear)) {
             projectsStore.setFilter("year", selectedYear);
        }
    } else {
        projectsStore.setFilter("year", undefined);
    }
  };

  const handleTypeSubmit = (selectedValues: string[]) => {
    if (selectedValues.length > 0) {
      const selectedName = selectedValues[0];

      const matchedType = fullProjectTypes.find(
        (type) => type.description === selectedName
      );

      if (matchedType) {
        projectsStore.setFilter("type", matchedType.id);
      }
    } else {
      projectsStore.setFilter("type", undefined);
    }
  };

  const handleRevenueMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    projectsStore.setFilter("revenueMin", Number(e.target.value));
  };

  const handleRevenueMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    projectsStore.setFilter("revenueMax", Number(e.target.value));
  };

  return (
    <div className={styles.projectsDashboardContainer}>
      <h1>Projetos</h1>
      <section className={styles.filterSection}>
        <Select
          options={years}
          placeholder="Filtrar por: Ano"
          onSubmit={handleYearSubmit}
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
            data={projectDiversificationByType}
            dataKey="value"
            nameKey="name"
            title="Diversificação por Tipo de Projeto (%)"
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
          <Searchbar
            placeholder="Buscar nome do projeto..."
            value={filters.name}
            onChange={handleSearchChange}
          />

          <Select
            placeholder="Filtrar por: Tipo"
            options={projectTypeOptions}
            onSubmit={handleTypeSubmit}
            selectAll
            multiple
          />

          <div className={styles.rangeContainerProjects}>
            <RangeInput
              valueMin={filters.revenueMin}
              valueMax={filters.revenueMax}
              onChangeMin={handleRevenueMinChange}
              onChangeMax={handleRevenueMaxChange}
            />
          </div>

          <div className={styles.rangeContainerProjects}>
            <RangeInput
              valueMin={0}
              valueMax={10}
              onChangeMin={() => {}}
              onChangeMax={() => {}}
            />
          </div>

          <div className={styles.addContainer}>
            <AddButton onClick={() => navigate("/register/project")} />{" "}
          </div>
        </div>

        <div className={styles.tableContentContainer}>
          {projectsStore.isLoadingTable ? (
            <p>Carregando projetos...</p>
          ) : (
            <PaginatedTable
              data={tableData}
              columns={[
                { key: "projeto", label: "Projeto" },
                { key: "tipoProjeto", label: "Tipo de Projeto" },
                { key: "faturamento", label: "Faturamento" },
                { key: "prazo", label: "Prazo" },
              ]}
              rowsPerPage={filters.limit}
              edit
              delete
              onEdit={(row) => console.log("Editar:", row)}
              onDelete={(row) => console.log("Excluir:", row)}
            />
          )}
        </div>
      </section>
    </div>
  );
});

export default ProjectsDashboard;