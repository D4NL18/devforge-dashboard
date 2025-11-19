import styles from "./index.module.scss";
import Navbar from "../../Components/Navbar";
import Select from "Components/Select";
import Chart from "Components/Chart";
import CardInfo from "Components/CardInfo";
import { homeStore } from "./store";
import { useEffect, useState } from "react";
import { Graph } from "types/graph.interface";
import { toJS } from "mobx";

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

export default function Home() {
  const [revenue, setRevenue] = useState<any>(null);
  const [currentBalance, setCurrentBalance] = useState<string>("0,00");
  const [costBySegment, setCostBySegment] = useState<Graph[]>([]);
  const [revenueByProject, setRevenueByProject] = useState<Graph[]>([]);
  const [profitByProject, setProfitByProject] = useState<Graph[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await homeStore.fetchRevenue();
      setRevenue(toJS(homeStore.revenue));

      await homeStore.fetchCurrentBalance();
      setCurrentBalance(homeStore.currentBalance);

      await homeStore.fetchCostBySegment();
      setCostBySegment(toJS(homeStore.costBySegment));

      await homeStore.fetchRevenueByProject();
      setRevenueByProject(toJS(homeStore.revenueByProject));

      await homeStore.fetchProfitByProject();
      setProfitByProject(toJS(homeStore.profitByProject));
    };

    fetchData();
  }, []);

  const getFormattedValue = (defaultValue: any) => {
    if (defaultValue && !Array.isArray(defaultValue)) {
      const val = Number(defaultValue.value);
      if (!isNaN(val)) {
        return val.toFixed(2).replace(".", ",");
      }
    }
    return "0,00";
  };

  const safeRevenue = { value: getFormattedValue(revenue) };
  const safeCurrentBalance = currentBalance || "0,00";

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
              <CardInfo
                title="Faturamento"
                value={`R$ ${safeRevenue.value}`}
              ></CardInfo>
              <CardInfo
                title="Caixa Atual"
                value={`R$ ${safeCurrentBalance}`}
              ></CardInfo>
            </div>
          </div>
          <div className={styles.chartContainer}>
            <Chart
              type="pie"
              title="Gastos por Setor"
              data={costBySegment}
              dataKey="value"
              nameKey="name"
            ></Chart>
          </div>
          <div className={styles.chartContainer}>
            <Chart
              title="Faturamento por Projeto"
              type="bar"
              data={revenueByProject}
              dataKey="value"
              nameKey="name"
            ></Chart>
          </div>

          <div className={styles.chartContainer}>
            <Chart
              title="Lucro por Projeto"
              type="bar"
              data={profitByProject}
              dataKey="value"
              nameKey="name"
            ></Chart>
          </div>
        </section>
      </div>
    </div>
  );
}
