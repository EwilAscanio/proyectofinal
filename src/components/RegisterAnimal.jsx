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
import Swal from "sweetalert2";
import { useRef } from "react";

const RegisterAnimal = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Realizo una referencia para el input de código animal
  const codigoAnimalRef = useRef(null);

  const onSubmit = handleSubmit(async (data) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/animal`,
      data
    );

    if (res.status == 200) {
      Swal.fire({
        title: "Registrar Animal",
        text: "El animal ha sido registrado exitosamente.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
      //router.push(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/auth/dashboard`);
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
    <>
      <div className="flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Registrar Animal
            </h1>
            <p className="text-gray-600 mt-2">
              Rellene los datos correctamente
            </p>
          </div>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-4">
              {/* Campo numero 1 del Formulario CODIGO ANIMAL */}
              <div className="relative">
                <LuUser
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  ref={codigoAnimalRef} // Asignar la referencia al input de código animal
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
                      message: "El codigo debe terner minimo 2 caracteres",
                    },
                  })}
                />
                {/* Manejo de Errores */}
                {errors.codigo_ani && (
                  <span className="text-red-600 text-sm">
                    {errors.codigo_ani.message}
                  </span>
                )}
              </div>

              {/* Campo numero 2 del Formulario NOMBRE ANIMAL */}
              <div className="relative">
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
                      message: "El nombre debe terner minimo 2 caracteres",
                    },
                  })}
                />
                {/* Manejo de Errores */}
                {errors.nombre_ani && (
                  <span className="text-red-600 text-sm">
                    {errors.nombre_ani.message}
                  </span>
                )}
              </div>

              {/* Campo numero 3 del Formulario CHIP ANIMAL */}
              <div className="relative">
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
                {/* Manejo de Errores */}
                {errors.chip_ani && (
                  <span className="text-red-600 text-sm">
                    {errors.chip_ani.message}
                  </span>
                )}
              </div>

              {/* Campo numero 4 del Formulario GRUPO ANIMAL */}
              <div className="relative">
                <select
                  className="text-gray-400 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  {...register("id_gru")}
                >
                  <option value="">Grupo Animal</option>
                  <option value="1">Bobinos</option>
                  <option value="2">Becerros</option>
                  <option value="3">Caballos</option>
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

              {/* Campo numero 5 del Formulario FAMILIA ANIMAL */}
              <div className="relative">
                <select
                  className="text-gray-400 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  {...register("id_fam")}
                >
                  <option value="">Familia Animal</option>
                  <option value="1">Toros</option>
                  <option value="2">Vacas</option>
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

              {/* Campo numero 6 del Formulario SEXO ANIMAL */}
              <div className="relative">
                <select
                  className="text-gray-400 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  {...register("sexo_ani")}
                >
                  <option value="">Sexo Animal</option>
                  <option value="Hembra">Hembra</option>
                  <option value="Macho">Macho</option>
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

              {/* Campo numero 7 del Formulario FECHA PALPACION */}
              <div className="relative">
                <LuLock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  placeholder="Fecha Palpacion"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("fechaPalpacion_ani", {
                    required: {
                      value: true,
                      message: "campo requerido",
                    },
                  })}
                />
                {/* Manejo de Errores */}
                {errors.fechaPalpacion && (
                  <span className="text-red-600 text-sm">
                    {errors.fechaPalpacion.message}
                  </span>
                )}
              </div>

              {/* Campo numero 8 del Formulario TIEMPO DE GESTACION */}
              <div className="relative">
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
                      message: "Debe terner minimo 2 caracteres",
                    },
                  })}
                />
                {/* Manejo de Errores */}
                {errors.tiempoGestacion_ani && (
                  <span className="text-red-600 text-sm">
                    {errors.tiempoGestacion_ani.message}
                  </span>
                )}
              </div>

              {/* Campo numero 9 del Formulario PESO ANIMAL */}
              <div className="relative">
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
                      message: "El peso no puede estar vacio",
                    },
                  })}
                />
                {/* Manejo de Errores */}
                {errors.peso_ani && (
                  <span className="text-red-600 text-sm">
                    {errors.peso_ani.message}
                  </span>
                )}
              </div>

              {/* Campo numero 10 del Formulario ARETE ANIMAL */}
              <div className="relative">
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

              {/* Campo numero 11 del Formulario FECHA NACIMIENTO */}
              <div className="relative">
                <LuLock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  placeholder="Fecha de Nacimiento"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("fechaNacimiento_ani", {
                    required: {
                      value: true,
                      message: "campo requerido",
                    },
                  })}
                />
                {/* Manejo de Errores */}
                {errors.fechaNacimiento_ani && (
                  <span className="text-red-600 text-sm">
                    {errors.fechaNacimiento_ani.message}
                  </span>
                )}
              </div>

              {/* Campo numero 12 del Formulario FECHA VACUNACION */}
              <div className="relative">
                <LuLock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  placeholder="Fecha de Vacunacion"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("fechaVacunacion_ani", {
                    required: {
                      value: true,
                      message: "campo requerido",
                    },
                  })}
                />
                {/* Manejo de Errores */}
                {errors.fechaVacunacion_ani && (
                  <span className="text-red-600 text-sm">
                    {errors.fechaVacunacion_ani.message}
                  </span>
                )}
              </div>

              {/* Campo numero 13 del Formulario STATUS ANIMAL */}
              <div className="relative">
                <select
                  className="text-gray-400 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  {...register("status_ani")}
                >
                  <option value="">Status del Animal</option>
                  <option value="2">Inactivo</option>
                  <option value="1">Activo</option>
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

              {/* Campo numero 14 del Formulario PRECIO ANIMAL*/}
              <div className="relative">
                <LuUserCircle
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="number"
                  placeholder="Precio del Animal"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("precio_ani", {
                    required: {
                      value: true,
                      message: "campo requerido",
                    },
                    minLength: {
                      value: 1,
                      message: "El precio no puede estar vacio",
                    },
                  })}
                />
                {/* Manejo de Errores */}
                {errors.precio_ani && (
                  <span className="text-red-600 text-sm">
                    {errors.precio_ani.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="col-span-2  w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center mt-6"
              >
                Registrar Animal
                <LuArrowRight className="ml-2" size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterAnimal;
