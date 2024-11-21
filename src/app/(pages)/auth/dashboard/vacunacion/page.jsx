"use client";
import axios from "axios";
import Swal from "sweetalert2";
import { LuMail } from "react-icons/lu";
import { MdDateRange } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"; // Asegúrate de importar useRouter

const Vacunacion = () => {
  const router = useRouter(); // Inicializa el enrutador
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await axios.put("http://localhost:3000/api/vacunacion", data);

      if (res.status === 200) {
        Swal.fire({
          title: "Éxito",
          text: "La fecha de vacunación se actualizó para todos los animales.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        router.push("/auth/dashboard"); // Cambia a la ruta relativa
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
  });

  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Actualizar Fecha de Vacunacion
          </h1>
          <p className="text-gray-600 mt-2">Indique la fecha</p>
        </div>
        {/* <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
      </div> */}
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="relative">
            <MdDateRange
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="date"
              placeholder="Fecha de Vacunación"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("fechaVacunacion_ani", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
              })}
            />
            {errors.vaccinationDate && (
              <span className="text-red-600 text-sm">
                {errors.vaccinationDate.message}
              </span>
            )}
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
export default Vacunacion;
