"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  LuUser,
  LuUserCircle,
  LuMail,
  LuLock,
  LuArrowRight,
} from "react-icons/lu";
import Link from "next/link";
import Swal from "sweetalert2";

const Animal = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const res = await axios.post("http://localhost:3000/api/animal", data);

    console.log(res);

    if (res.status == 200) {
      Swal.fire({
        title: "Registrar Animal",
        text: "El animal ha sido registrado exitosamente.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
      router.push("http://localhost:3000/auth/dashboard");
      router.refresh();
    } else if (res.status === 400) {
      // Error de validación del servidor
      alert(
        "Los datos ingresados no son válidos. Por favor, verifica los campos."
      );
    } else if (res.status === 500) {
      // Error interno del servidor
      alert("Ocurrió un error en el servidor. Intenta nuevamente más tarde.");
    } else {
      // Otro error
      alert(
        "Ocurrió un error inesperado. Por favor, contacta al administrador."
      );
    }
  });

  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Registrar Animal</h1>
          <p className="text-gray-600 mt-2">Rellene los datos correctamente</p>
        </div>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Campo número 1 del Formulario CODIGO ANIMAL */}
            <div className="relative col-span-1">
              <LuUser
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Codigo Animal"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("codigo_ani", {
                  required: {
                    value: true,
                    message: "campo requerido",
                  },
                  minLength: {
                    value: 2,
                    message: "El codigo debe tener mínimo 2 caracteres",
                  },
                })}
              />
            </div>

            {/* Campo número 2 del Formulario NOMBRE ANIMAL */}
            <div className="relative col-span-1">
              <LuUserCircle
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Nombre Animal"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("nombre_ani", {
                  required: {
                    value: true,
                    message: "campo requerido",
                  },
                  minLength: {
                    value: 2,
                    message: "El nombre debe tener mínimo 2 caracteres",
                  },
                })}
              />
            </div>

            {/* Campo número 3 del Formulario CHIP ANIMAL */}
            <div className="relative col-span-1">
              <LuMail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Chip"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("chip_ani", {
                  required: {
                    value: true,
                    message: "campo requerido",
                  },
                })}
              />
            </div>

            {/* Campo número 4 del Formulario GRUPO ANIMAL */}
            <div className="relative col-span-1">
              <select
                className="text-gray-400 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                {...register("grupo_ani")}
              >
                <option value="">Grupo Animal</option>
                <option value="2">Bobinos</option>
                <option value="1">Toros</option>
              </select>
              <LuUserCircle
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <LuArrowRight
                className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400"
                size={20}
              />
            </div>

            {/* Campo número 5 del Formulario FAMILIA ANIMAL */}
            <div className="relative col-span-1">
              <select
                className="text-gray-400 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                {...register("familia_ani")}
              >
                <option value="">Familia Animal</option>
                <option value="2">Becerros</option>
                <option value="1">Vacas</option>
              </select>
              <LuUserCircle
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <LuArrowRight
                className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400"
                size={20}
              />
            </div>

            {/* Campo número 6 del Formulario SEXO ANIMAL */}
            <div className="relative col-span-1">
              <select
                className="text-gray-400 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                {...register("sexo_ani")}
              >
                <option value="">Sexo Animal</option>
                <option value="2">Hembra</option>
                <option value="1">Macho</option>
              </select>
              <LuUserCircle
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <LuArrowRight
                className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400"
                size={20}
              />
            </div>

            {/* Campo número 7 del Formulario FECHA PALPACION */}
            <div className="relative col-span-1">
              <LuLock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="date"
                placeholder="Fecha Palpacion"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("fechaPalpacion_ani", {
                  required: {
                    value: true,
                    message: "campo requerido",
                  },
                })}
              />
            </div>

            {/* Campo número 8 del Formulario Tiempo de Gestacion */}
            <div className="relative col-span-1">
              <LuUserCircle
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Tiempo de Gestacion"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("tiempoGestacion_ani", {
                  required: {
                    value: true,
                    message: "campo requerido",
                  },
                  minLength: {
                    value: 2,
                    message: "Debe tener mínimo 2 caracteres",
                  },
                })}
              />
            </div>

            {/* Campo número 9 del Formulario PESO ANIMAL */}
            <div className="relative col-span-1">
              <LuUserCircle
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="number"
                placeholder="Peso del Animal"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("peso_ani", {
                  required: {
                    value: true,
                    message: "campo requerido",
                  },
                  minLength: {
                    value: 1,
                    message: "El peso no puede estar vacío",
                  },
                })}
              />
            </div>

            {/* Campo número 10 del Formulario ARETE ANIMAL */}
            <div className="relative col-span-1">
              <LuUserCircle
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Arete Animal"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("arete_ani", {
                  required: {
                    value: true,
                    message: "campo requerido",
                  },
                  minLength: {
                    value: 2,
                    message: "El arete debe terner minimo 2 caracteres",
                  },
                })}
              />
              {/* Manejo de Errores */}
              {errors.arete_ani && (
                <span className="text-red-600 text-sm">
                  {errors.arete_ani.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center mt-6"
            >
              Registrar Animal
              <LuArrowRight className="ml-2" size={20} />
            </button>
          </div>
        </form>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center mt-6"
        >
          Registrar Animal
          <LuArrowRight className="ml-2" size={20} />
        </button>
      </div>
    </div>
  );
};

export default Animal;
