import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import React from "react";

type ChartType = "bar" | "line" | "pie";

type ChartProps = {
  type: ChartType;
  data: any[];
  dataKey: string;
  nameKey?: string;
  title?: string;
  showLegend?: boolean;
  colors?: string[];
};

export default function Chart({
  type,
  data,
  dataKey,
  nameKey,
  title,
  showLegend = true,
  colors = ["#3b82f6", "#22c55e", "#ef4444", "#f59e0b"],
}: ChartProps) {
  let chartContent: React.ReactElement;

  switch (type) {
    case "bar":
      chartContent = (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={nameKey || "name"} />
          <YAxis />
          <Tooltip />
          {showLegend && <Legend />}
          <Bar dataKey={dataKey} fill={colors[0]} />
        </BarChart>
      );
      break;

    case "line":
      chartContent = (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={nameKey || "name"} />
          <YAxis />
          <Tooltip />
          {showLegend && <Legend />}
          <Line type="monotone" dataKey={dataKey} stroke={colors[0]} />
        </LineChart>
      );
      break;

    case "pie":
      chartContent = (
        <PieChart>
          <Tooltip />
          {showLegend && <Legend />}
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={nameKey || "name"}
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
          >
            {data.map((_, idx) => (
              <Cell key={idx} fill={colors[idx % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      );
      break;

    default:
      chartContent = <div>Nenhum gráfico disponível</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "800px",
      }}
    >
      {title && (
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>{title}</h2>
      )}
      <ResponsiveContainer width="100%" height={300}>
        {chartContent}
      </ResponsiveContainer>
    </div>
    );
}
