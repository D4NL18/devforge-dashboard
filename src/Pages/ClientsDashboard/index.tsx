import Select from "Components/Select";
import styles from "./index.module.scss";
import Chart from "Components/Chart";
import PaginatedTable, { TableRowBase } from "Components/PaginatedTable";
import RangeInput from "Components/RangeInput";
import AddButton from "Components/AddButton";
import Searchbar from "Components/Searchbar";
import { useEffect, useState } from "react";
import { clientsStore } from "./store";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { Graph } from "types/graph.interface";
import { useNavigate } from "react-router-dom";

const ClientsDashboard = observer(() => {
  const { filters, clientsList } = clientsStore;
  const navigate = useNavigate();

  const years = [
    "2025", "2024"
  ];

  const [churnRevenueData, setChurnRevenueData] = useState<Graph[]>([]);
  const [cacData, setCacData] = useState<Graph[]>([]);
  const [ltvData, setLtvData] = useState<Graph[]>([]);
  
  const [clientDiversificationData] = useState<Graph[]>([
    { name: "Cliente A", value: 32 },
    { name: "Cliente B", value: 27 },
    { name: "Cliente C", value: 23 },
    { name: "Cliente D", value: 18 },
  ]);
  const [delinquencyData] = useState<Graph[]>([
    { name: "Em atraso", value: 32 },
    { name: "Em dia", value: 68 },
  ]);

  const fetchGraphs = async () => {
    await clientsStore.fetchChurnRevenue();
    const rawChurn = toJS(clientsStore.churnRevenueByMonth) || [];
    setChurnRevenueData(rawChurn.map((item: Graph) => ({
        name: item.name,
        value: Number(item.value ? item.value.toFixed(2) : 0),
    })));

    await clientsStore.fetchCac();
    const rawCac = toJS(clientsStore.cacByMonth) || [];
    setCacData(rawCac.map((item: Graph) => ({
        name: item.name,
        value: Number(item.value ? item.value.toFixed(2) : 0),
    })));

    await clientsStore.fetchLtv();
    const rawLtv = toJS(clientsStore.ltvByMonth) || [];
    setLtvData(rawLtv.map((item: Graph) => ({
        name: item.name,
        value: Number(item.value ? item.value.toFixed(2) : 0),
    })));
  };

  useEffect(() => {
    clientsStore.fetchClients();
    fetchGraphs();
  }, []);

  useEffect(() => {
    fetchGraphs();
  }, [filters.years]);

  type ClientRow = TableRowBase & {
    id: string; 
    cliente: string;
    tipoProjeto: string;
    valorInadimplente: string;
    atraso: string; 
  };

  const tableData: ClientRow[] = (clientsList || []).map((c: any) => ({
    id: c.id,
    cliente: c.name || "Cliente sem nome",
    tipoProjeto: c.projectType || "N/A", 
    valorInadimplente: `R$ ${c.delinquentAmount?.toFixed(2) || "0.00"}`, 
    atraso: c.delayDays ? `${c.delayDays} dias` : "0 dias", 
  }));

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clientsStore.setFilter("name", e.target.value);
  };

  const handleYearSubmit = (selectedValues: string[]) => {
    clientsStore.setFilter("years", selectedValues);
  };

  const handleTypeSubmit = (selectedValues: string[]) => {
    if (selectedValues.length > 0) {
      clientsStore.setFilter("type", selectedValues[0]);
    } else {
      clientsStore.setFilter("type", undefined);
    }
  };

  const handleRevenueMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clientsStore.setFilter("revenueMin", Number(e.target.value));
  };

  const handleRevenueMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clientsStore.setFilter("revenueMax", Number(e.target.value));
  };

  const handleMonthsMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clientsStore.setFilter("monthsMin", Number(e.target.value));
  };

  const handleMonthsMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clientsStore.setFilter("monthsMax", Number(e.target.value));
  };

  return (
    <div className={styles.clientsDashboardContainer}>
      <h1>Clientes</h1>

      <section className={styles.filtersSection}>
        <Select
          options={years}
          placeholder="Filtrar por: Ano"
          onSubmit={handleYearSubmit}
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
          <Searchbar 
            placeholder="Buscar por nome de cliente..." 
            value={filters.name}
            onChange={handleSearchChange}
          />
          
          <Select
            placeholder="Filtrar por: Tipo"
            options={["Landing Page", "Dashboard", "Mobile App"]}
            onSubmit={handleTypeSubmit}
          />
          
          <div className={styles.rangeContainerClients}>
            <RangeInput
              valueMin={filters.revenueMin}
              valueMax={filters.revenueMax}
              onChangeMin={handleRevenueMinChange}
              onChangeMax={handleRevenueMaxChange}
            />
          </div>
          
          <div className={styles.rangeContainerClients}>
            <RangeInput
              valueMin={filters.monthsMin}
              valueMax={filters.monthsMax}
              onChangeMin={handleMonthsMinChange}
              onChangeMax={handleMonthsMaxChange}
            />
          </div>
          
          <div className={styles.addContainer}>
            <AddButton onClick={() => console.log("clicked")} />
          </div>
        </div>

        <div className={styles.tableContentContainer}>
          {clientsStore.isLoadingTable ? (
             <p>Carregando clientes...</p>
          ) : (
            <PaginatedTable
                data={tableData}
                columns={[
                { key: "cliente", label: "Cliente" },
                { key: "tipoProjeto", label: "Tipo de Projeto" },
                { key: "valorInadimplente", label: "Valor Inadimplente" },
                { key: "atraso", label: "Atraso" },
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

export default ClientsDashboard;