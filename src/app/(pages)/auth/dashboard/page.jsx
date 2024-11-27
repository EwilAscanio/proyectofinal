"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios"; // Asegúrate de importar axios
import { Chart } from "chart.js/auto";
import { FaUsers, FaFileInvoiceDollar, FaCalendar } from "react-icons/fa";
import { LuMilk } from "react-icons/lu";
import CardDashboard from "@/components/CardDashboard";

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
  responsive: true,
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

const ChartComponent = () => {
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

  return <canvas ref={chartRef}></canvas>;
};

const Page = () => {
  const [fechaVacunacion, setFechaVacunacion] = useState(null);

  useEffect(() => {
    const obtenerFechaVacunacion = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/configuracion`
        );

        const config = res.data[0];

        if (res.status === 200) {
          const fecha = formatDate(config.ultima_vacunacion);
          setFechaVacunacion(fecha); // Asegúrate de que esta propiedad exista
        }
      } catch (error) {
        console.error("Error al obtener la fecha de vacunación", error);
      }
    };

    obtenerFechaVacunacion();
  }, []);

  // Función para formatear la fecha de la api viene 2023-01-01 00:00:00
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Meses son 0-indexados
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardDashboard
          title="Total Animales"
          value="40.685"
          icon={<FaUsers className="w-full h-10 text-white" />}
          bgColor="bg-blue-500"
        />
        <CardDashboard
          title="Total Litros de Leche"
          value="10.293"
          icon={<LuMilk className="w-full h-10 text-white" />}
          bgColor="bg-green-500"
        />
        <CardDashboard
          title="Total de Inventario"
          value="89.600 $"
          icon={<FaFileInvoiceDollar className="w-full h-10 text-white" />}
          bgColor="bg-red-500"
        />
        <CardDashboard
          title="Última Fecha de Vacunación"
          value={fechaVacunacion ? fechaVacunacion : "Cargando..."} // Muestra "Cargando..." mientras se obtiene la fecha
          icon={<FaCalendar className="w-full h-10 text-white" />}
          bgColor="bg-yellow-500"
        />
      </div>
      <div className="mt-10 p-4">
        <ChartComponent />
      </div>
    </div>
  );
};

export default Page;
