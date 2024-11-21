"use client";
import axios from "axios";
import Swal from "sweetalert2";
import { FaBarcode, FaCalendar } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Nacimiento = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const [animalCargado, setAnimalCargado] = useState(false);
  const [animalMadre, setAnimalMadre] = useState(null);
  const [cantidadHijos, setCantidadHijos] = useState(1);

  const buscarAnimal = async (codigo) => {
    if (!codigo) {
      setAnimalCargado(false);
      return;
    }

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/animal/${codigo}`
      );
      if (res.status === 200 && res.data.sexo === "hembra") {
        setAnimalMadre(res.data);
        setAnimalCargado(true);
        Swal.fire({
          title: "Éxito",
          text: "Animal madre encontrado.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "El animal encontrado no es hembra.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
        setAnimalCargado(false);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Animal no encontrado.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
      setAnimalCargado(false);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/nacimiento`,
        { ...data, animalMadre, cantidadHijos }
      );
      if (res.status === 200) {
        Swal.fire({
          title: "Éxito",
          text: "El nacimiento se registró correctamente.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        router.push("/auth/dashboard");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al registrar el nacimiento.",
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
            Proceso de Nacimiento
          </h1>
          <p className="text-gray-600 mt-2">
            Debe haber un animal hembra cargado para habilitar los campos.
          </p>
        </div>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="flex items-center relative">
            <FaBarcode
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Código del animal madre"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("codigo_ani", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
              })}
            />
            <button
              type="button"
              onClick={() => buscarAnimal(getValues("codigo_ani"))}
              className="ml-2 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
            >
              Buscar
            </button>
            {errors.codigo_ani && (
              <span className="text-red-600 text-sm">
                {errors.codigo_ani.message}
              </span>
            )}
          </div>

          {animalCargado && (
            <>
              <div className="relative">
                <FaCalendar
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="date"
                  placeholder="Fecha de Nacimiento"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("fecha_nac", { required: true })}
                />
                {errors.fecha_nac && (
                  <span className="text-red-600 text-sm">
                    {errors.fecha_nac.message}
                  </span>
                )}
              </div>

              <div className="relative">
                <input
                  type="number"
                  placeholder="Cantidad de hijos paridos"
                  className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={cantidadHijos}
                  onChange={(e) => setCantidadHijos(e.target.value)}
                  min="1"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-lg p-2"
            disabled={!animalCargado} // Deshabilita el botón si no hay animal cargado
          >
            Registrar Nacimiento
          </button>
        </form>
      </div>
    </div>
  );
};

export default Nacimiento;
