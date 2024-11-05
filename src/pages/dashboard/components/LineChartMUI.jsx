import React from "react";
import { LineChart } from "@mui/x-charts";

export default function LineChartMUI({ data }) {
  // Extraer el nombre de la propiedad para el eje Y (asume que es el primer elemento del array)
  const yAxisKey = Object.keys(data[0]).find((key) => key !== "fecha");

  // Generar los datos para el eje X y Y
  const xAxisData = data.map((item) => new Date(item.fecha));
  const yAxisData = data.map((item) => item[yAxisKey]);

  return (
    <div>
      <LineChart
        xAxis={[
          {
            label: "Fecha",
            data: xAxisData,
            tickInterval: xAxisData,
            scaleType: "time",
            valueFormatter: (date) =>
              new Date(date).toLocaleDateString("es-ES", { month: "short", day: "numeric", hour:"2-digit", minute:"2-digit" }),
          },
        ]}
        yAxis={[{ label: yAxisKey }]}
        series={[
          { label: yAxisKey, data: yAxisData, area:true },
        ]}
        height={400}
      />
    </div>
  );
}
