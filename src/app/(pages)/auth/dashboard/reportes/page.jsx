"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Reportes = () => {
  const [reportes, setReportes] = useState([]);
  const [cargando, setCargando] = useState(false);

  const generarReporte = async () => {
    setCargando(true);
    try {
      const res = await axios.get("http://localhost:3000/api/reportes/ventas");
      setReportes(res.data);
      Swal.fire({
        title: "Reporte Generado",
        text: "El reporte de ventas ha sido generado exitosamente.",
        icon: "success",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al generar el reporte.",
        icon: "error",
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="mt-20 p-4">
      <h1 className="text-3xl font-bold text-center">Reportes</h1>
      <button
        onClick={generarReporte}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg"
        disabled={cargando}
      >
        {cargando ? "Generando..." : "Generar Reporte de Ventas"}
      </button>

      {reportes.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Reporte de Ventas</h2>
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">ID</th>
                <th className="border border-gray-300 p-2">Cliente</th>
                <th className="border border-gray-300 p-2">Total</th>
                <th className="border border-gray-300 p-2">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {reportes.map((reporte) => (
                <tr key={reporte.id}>
                  <td className="border border-gray-300 p-2">{reporte.id}</td>
                  <td className="border border-gray-300 p-2">
                    {reporte.cliente}
                  </td>
                  <td className="border border-gray-300 p-2">
                    ${reporte.total}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {new Date(reporte.fecha).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Reportes;
