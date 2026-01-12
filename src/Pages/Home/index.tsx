import styles from "./index.module.scss";
import Navbar from "../../Components/Navbar";
import Select from "Components/Select";
import Chart from "Components/Chart";
import CardInfo from "Components/CardInfo";

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

const ExpendsByArea = [
  { name: "Desenvolvimento", value: 4000 },
  { name: "Marketing", value: 3000 },
  { name: "Vendas", value: 2000 },
  { name: "Recursos Humanos", value: 2780 },
];

const RevenuesByProject = [
  { name: "Projeto A", Valor: 5000 },
  { name: "Projeto B", Valor: 3000 },
  { name: "Projeto C", Valor: 2000 },
];

const ProfitByProject = [
  { name: "Projeto A", Valor: 2000 },
  { name: "Projeto B", Valor: 1500 },
  { name: "Projeto C", Valor: 1000 },
];

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.mainContent}>
        <section className={styles.logoSection}>
          <img
            src="/assets/DevForge-logo-removebg.png"
            alt="DevForge Logo"
            className={styles.logo}
          />
        </section>
        <section className={styles.infoSection}>
          <div className={styles.infoCardContainer}>
            <div className={styles.filterContainer}>
              <Select
                options={years}
                selectAll
                multiple
                hasSearch
                placeholder="Filtrar por: Ano"
              />
              <Select
                options={months}
                selectAll
                multiple
                hasSearch
                placeholder="Filtrar por: Mês"
              />
            </div>
            <div className={styles.infoCardBox}>
              <CardInfo title="Faturamento" value="4321,99"></CardInfo>
              <CardInfo title="Caixa Atual" value="15432,10"></CardInfo>
            </div>
          </div>
          <div className={styles.chartContainer}>
            <Chart
              type="pie"
              title="Gastos por Setor"
              data={ExpendsByArea}
              dataKey="value"
              nameKey="name"
            ></Chart>
          </div>
          <div className={styles.chartContainer}>
            <Chart
              title="Faturamento por Projeto"
              type="bar"
              data={RevenuesByProject}
              dataKey="Valor"
              nameKey="name"
            ></Chart>
          </div>

          <div className={styles.chartContainer}>
            <Chart
              title="Lucro por Projeto"
              type="bar"
              data={ProfitByProject}
              dataKey="Valor"
              nameKey="name"
            ></Chart>
          </div>
        </section>
      </div>
    </div>
  );
}
