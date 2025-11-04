import Select from "Components/Select";
import styles from "./index.module.scss";
import Chart from "Components/Chart";

export default function ClientsDashboard() {
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
  const months = [
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
  ];

  const clientDiversificationData = [
    { name: "Cliente A", value: 32 },
    { name: "Cliente B", value: 27 },
    { name: "Cliente C", value: 23 },
    { name: "Cliente D", value: 18 },
  ];

  const delinquencyData = [
    { name: "Late", value: 32 },
    { name: "On time", value: 68 },
  ];

  return (
    <div className={styles.clientsDashboardContainer}>
      <h1>Clientes</h1>
      <div className={styles.filtersContainer}>
        <Select
          options={years}
          selectAll
          multiple
          hasSearch
          placeholder="Filtrar por: Ano"
        ></Select>
        <Select
          options={months}
          selectAll
          multiple
          hasSearch
          placeholder="Filtrar por: Mês"
        ></Select>
      </div>
      <div className={styles.chartsContainer}>
        <div className={styles.pieChartsContainer}>
          <Chart
            type="pie"
            data={clientDiversificationData}
            dataKey="value"
            nameKey="name"
            title="Diversificação de Clientes"
          ></Chart>
          <Chart
            type="pie"
            data={delinquencyData}
            dataKey="value"
            nameKey="name"
            title="Taxa de Inadimplência"
          ></Chart>
        </div>
        <div className={styles.lineBarChartsContainer}></div>
      </div>
    </div>
  );
}
