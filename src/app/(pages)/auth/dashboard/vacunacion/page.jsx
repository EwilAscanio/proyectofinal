"use client";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateVaccinationDate = () => {
  const [vaccinationDate, setVaccinationDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:3000/api/updateVaccinationDate",
        {
          vaccinationDate,
        }
      );

      if (res.status === 200) {
        Swal.fire({
          title: "Éxito",
          text: "La fecha de vacunación se actualizó para todos los animales.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al actualizar la fecha de vacunación.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="mt-20 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Actualizar Fecha de Vacunación
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">
              Nueva Fecha de Vacunación:
            </label>
            <input
              type="date"
              value={vaccinationDate}
              onChange={(e) => setVaccinationDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-lg p-2"
          >
            Actualizar
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateVaccinationDate;
