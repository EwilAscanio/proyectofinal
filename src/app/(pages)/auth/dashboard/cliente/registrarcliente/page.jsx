"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  LuUser,
  LuMail,
  LuPhone,
  LuArrowRight,
  LuMapPin,
  LuFileText,
} from "react-icons/lu";
import Link from "next/link";
import Swal from "sweetalert2";

const RegisterClient = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/cliente", data);

      console.log("DATA CLIENTE FRONTEND", res);

      if (res.status === 200) {
        Swal.fire({
          title: "Registrar Cliente",
          text: "El cliente ha sido registrado exitosamente.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirige solo si el usuario hace clic en "OK"
            router.push("/auth/dashboard");
          }
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Cliente ya Registrado",
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
            Registrar Cliente
          </h1>
          <p className="text-gray-600 mt-2">Rellene los datos correctamente</p>
        </div>
        <form className="space-y-4" onSubmit={onSubmit}>
          {/* Campo CÓDIGO */}
          <div className="relative">
            <LuFileText
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Código del Cliente"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("codigo_cli", {
                required: "Campo requerido",
              })}
            />
            {errors.codigo_cli && (
              <span className="text-red-600 text-sm">
                {errors.codigo_cli.message}
              </span>
            )}
          </div>

          {/* Campo NOMBRE */}
          <div className="relative">
            <LuUser
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Nombre Completo"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("nombre_cli", {
                required: "Campo requerido",
                minLength: {
                  value: 2,
                  message: "El nombre debe tener mínimo 2 caracteres",
                },
              })}
            />
            {errors.nombre_cli && (
              <span className="text-red-600 text-sm">
                {errors.nombre_cli.message}
              </span>
            )}
          </div>

          {/* Campo EMAIL */}
          <div className="relative">
            <LuMail
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email_cli", {
                required: "Campo requerido",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email no válido",
                },
              })}
            />
            {errors.email_cli && (
              <span className="text-red-600 text-sm">
                {errors.email_cli.message}
              </span>
            )}
          </div>

          {/* Campo TELÉFONO */}
          <div className="relative">
            <LuPhone
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="tel"
              placeholder="Teléfono"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("telefono_cli", {
                required: "Campo requerido",
                pattern: {
                  value: /^[0-9]{10}$/, // Cambia este patrón según tu formato de teléfono
                  message: "Número de teléfono no válido",
                },
              })}
            />
            {errors.telefono_cli && (
              <span className="text-red-600 text-sm">
                {errors.telefono_cli.message}
              </span>
            )}
          </div>

          {/* Campo DIRECCIÓN */}
          <div className="relative">
            <LuMapPin
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Dirección"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("direccion_cli", {
                required: "Campo requerido",
              })}
            />
            {errors.direccion_cli && (
              <span className="text-red-600 text-sm">
                {errors.direccion_cli.message}
              </span>
            )}
          </div>

          {/* Campo RIF */}
          <div className="relative">
            <LuFileText
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="RIF"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("rif_cli", {
                required: "Campo requerido",
              })}
            />
            {errors.rif_cli && (
              <span className="text-red-600 text-sm">
                {errors.rif_cli.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center mt-6"
          >
            Crear Cliente
            <LuArrowRight className="ml-2" size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterClient;
