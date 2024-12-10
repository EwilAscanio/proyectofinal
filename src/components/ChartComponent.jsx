import { Chart } from "chart.js/auto";
import { useEffect, useRef } from "react";

const ChartComponent = () => {
  const data = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
    datasets: [
      {
        label: "Animales",
        data: [40, 45, 50, 55, 60, 65, 70],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(59, 130, 246)",
        fill: true,
      },
      {
        label: "Litros de Leche",
        data: [10, 15, 20, 25, 30, 35, 40],
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(76, 175, 80)",
        fill: true,
      },
      {
        label: "Inventario ($)",
        data: [89, 91, 92, 93, 95, 96, 98],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgb(244, 67, 54)",
        fill: true,
      },
    ],
  };

  const options = {
    resposive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Estadísticas de Ganadería",
      },
    },
  };

  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const myChart = new Chart(ctx, {
      type: "bar",
      data,
      options,
    });

    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div className="flex items-center justify-center lg:h-72">
      <canvas ref={chartRef} className="h-full w-full"></canvas>
    </div>
  );
};

export default ChartComponent;
