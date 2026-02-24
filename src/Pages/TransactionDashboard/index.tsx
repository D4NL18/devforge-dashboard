import Select from "Components/Select";
import styles from "./index.module.scss";
import CardInfo from "Components/CardInfo";
import Chart from "Components/Chart";
import PaginatedTable from "Components/PaginatedTable";
import Searchbar from "Components/Searchbar";
import RangeInput from "Components/RangeInput";
import AddButton from "Components/AddButton";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { transactionStore, CashFlowRow } from "./store";
import { useNavigate } from "react-router-dom";
import { toJS } from "mobx";

const TransactionDashboard = observer(() => {
  const {
    filters,
    cashFlowList,
    dreData,
    balanceSheetData,
    revenue,
    currentBalance,
    minCash,
    costBySegment,
    isLoadingTable,
  } = transactionStore;
  const navigate = useNavigate();

  const years = ["2026", "2025", "2024"];
  const months = [
    { label: "Janeiro", value: 1 },
    { label: "Fevereiro", value: 2 },
    { label: "Março", value: 3 },
    { label: "Abril", value: 4 },
    { label: "Maio", value: 5 },
    { label: "Junho", value: 6 },
    { label: "Julho", value: 7 },
    { label: "Agosto", value: 8 },
    { label: "Setembro", value: 9 },
    { label: "Outubro", value: 10 },
    { label: "Novembro", value: 11 },
    { label: "Dezembro", value: 12 },
  ];

  useEffect(() => {
    transactionStore.fetchCashFlow();
    transactionStore.fetchDreMetrics();
    transactionStore.fetchBalanceSheet();
    transactionStore.fetchCardMetrics();
    transactionStore.fetchCostBySegment();
  }, []);

  const handleYearSubmit = (vals: string[]) => {
    transactionStore.setFilter(
      "year",
      vals.length ? Number(vals[0]) : undefined,
    );
  };

  const handleMonthSubmit = (vals: string[]) => {
    if (vals.length) {
      const selected = months.find((m) => m.label === vals[0]);
      transactionStore.setFilter("month", selected?.value);
    } else {
      transactionStore.setFilter("month", undefined);
    }
  };

  const tableData: CashFlowRow[] = (cashFlowList || []).map((item, index) => ({
    // EXPLICAÇÃO DA CORREÇÃO:
    // Antes estava: id: item.id || index
    // 1. Removemos o operador lógico OU (||) e a variável 'index'.
    // 2. Agora o código confia estritamente no valor de 'item.id' retornado pela API.
    // 3. O uso de fallback para index mascara problemas no backend (se o id não vier) 
    //    e corrompe ações de CRUD como Editar e Deletar, pois você passaria a linha 
    //    da tabela (0, 1, 2...) para a API no lugar do ID do banco de dados (ex: 45, 92...).
    // Obs: Se o seu backend retornar o ID com outro nome de propriedade, como 'transactionId'
    // ou '_id', basta alterar 'item.id' para 'item.transactionId' ou 'item._id'.
    id: item.id, 
    titulo: item.title,
    categoria: item.category,
    valor: `R$ ${item.value?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
    type: (item.type === "in" ? "in" : "out") as "in" | "out",
  }));

  const handleDelete = (row: CashFlowRow) => {
    if (window.confirm(`Tem certeza que deseja excluir a transação "${row.titulo}"?`)) {
      transactionStore.deleteTransaction(row.id);
    }
  };

  const handleEdit = (row: CashFlowRow) => {
    navigate(`/register/transaction/${row.id}`);
  };

  return (
    <div className={styles.transactionDashboardContainer}>
      <h1>Transações</h1>

      <section className={styles.mainInfoSection}>
        <div className={styles.filters}>
          <div className={styles.filterSelectContainer}>
            <Select
              placeholder="Filtrar por: Ano"
              options={years}
              onSubmit={handleYearSubmit}
            />
          </div>
          <div className={styles.filterSelectContainer}>
            <Select
              placeholder="Filtrar por: Mês"
              options={months.map((m) => m.label)}
              onSubmit={handleMonthSubmit}
            />
          </div>
        </div>

        <div className={styles.infos}>
          <div className={styles.cardInfoBox}>
            <CardInfo title="Caixa Mínimo" value={`R$ ${minCash.toFixed(2)}`} />
            <CardInfo
              title="Caixa Atual"
              value={`R$ ${currentBalance.toFixed(2)}`}
              hasWarning={currentBalance < minCash}
            />
            <CardInfo title="Faturamento" value={`R$ ${revenue.toFixed(2)}`} />
            <CardInfo
              title="Lucro"
              value={`R$ ${(revenue * 0.15).toFixed(2)}`}
            />
          </div>
          <div className={styles.pieChartBox}>
            <Chart
              type="pie"
              title="Gastos por Setor"
              data={toJS(costBySegment) || []}
              dataKey="value"
              nameKey="name"
            />
          </div>
        </div>
      </section>

      <section className={styles.DRESection}>
        <h2>Demonstração do Resultado do Exercício - DRE</h2>
        <PaginatedTable
          data={dreData || []}
          rowsPerPage={15}
          columns={[
            { key: "metric", label: "Métricas" },
            { key: "value", label: "Valores" },
          ]}
        />
      </section>

      <section className={styles.patrimonialBalanceSection}>
        <h2>Balanço Patrimonial</h2>
        <PaginatedTable
          data={balanceSheetData || []}
          columns={[
            { key: "leftLabel", label: "Ativos" },
            { key: "leftValor", label: "Valor" },
            { key: "rightLabel", label: "Passivo e PL" },
            { key: "rightValor", label: "Valor" },
          ]}
        />
      </section>

      <section className={styles.cashFlowSection}>
        <h2>Fluxo de Caixa</h2>
        <div className={styles.filterContainer}>
          <Searchbar
            placeholder="Buscar título..."
            value={filters.name}
            onChange={(e) => transactionStore.setFilter("name", e.target.value)}
          />

          <Select
            placeholder="Filtrar por: Categoria"
            options={[
              "Recursos Humanos",
              "Infraestrutura e Equipamentos",
              "Projetos",
              "Administrativo e Financeiro",
              "Marketing e Comercial",
              "Pesquisa e Inovação",
            ]}
            onSubmit={(vals) => transactionStore.setFilter("category", vals[0])}
          />

          <RangeInput
            valueMin={filters.minValue}
            valueMax={filters.maxValue}
            onChangeMin={(e) =>
              transactionStore.setFilter("minValue", Number(e.target.value))
            }
            onChangeMax={(e) =>
              transactionStore.setFilter("maxValue", Number(e.target.value))
            }
          />

          <Select
            placeholder="Tipo"
            options={["Entrada", "Saida"]}
            onSubmit={(vals) =>
              transactionStore.setFilter(
                "balanceType",
                vals[0] === "Entrada"
                  ? "in"
                  : vals[0] === "Saida"
                    ? "out"
                    : undefined,
              )
            }
          />

          <div className={styles.addContainer}>
            <AddButton onClick={() => navigate("/register/transaction")} />
          </div>
        </div>

        {isLoadingTable ? (
          <p>Carregando fluxo de caixa...</p>
        ) : (
          <PaginatedTable<CashFlowRow>
            data={tableData}
            columns={[
              { key: "titulo", label: "Título" },
              { key: "categoria", label: "Categoria" },
              { key: "valor", label: "Valor" },
            ]}
            inOut
            rowsPerPage={filters.limit}
            edit
            delete
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </section>
    </div>
  );
});

export default TransactionDashboard;