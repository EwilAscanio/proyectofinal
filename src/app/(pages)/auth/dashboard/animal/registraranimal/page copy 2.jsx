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
import { useState, useEffect } from "react";
import FechaNacimientoInput from "@/components/FechaNacimientoInput"; // Asegúrate de que la ruta sea correcta

const Animal = () => {
  const router = useRouter();

  // useState para manejar el estado de los campos del formulario
  const [selectedGroup, setSelectedGroup] = useState("");
  const [familyOptions, setFamilyOptions] = useState([]);
  const [selectedSex, setSelectedSex] = useState("");
  const [grupos, setGrupos] = useState([]);

  // useEffect para cargar los grupos de animales desde la API al montar el componente
  // Se utiliza el hook useEffect para cargar los grupos de animales desde la API al montar el componente
  useEffect(() => {
    // Obtener los grupos de animales desde la API
    const cargarGrupo = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/grupoAnimales`
        );

        if (response.status === 200) {
          setGrupos(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "No se pudieron cargar los grupos",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    };

    cargarGrupo();
  }, []);

  // useEffect para resetear los valores de fecha de palpación y tiempo de gestación al montar el componente
  useEffect(() => {
    // Resetear valores y deshabilitar campos al inicio
    setValue("fechaPalpacion_ani", "");
    setValue("tiempoGestacion_ani", "");
  }, []); // Array vacío = se ejecuta solo al montar

  // useEffect para cargar las familias de animales desde la API al seleccionar un grupo
  // Se utiliza el hook useEffect para cargar las familias de animales desde la API al seleccionar un grupo
  useEffect(() => {
    const cargarFamilias = async () => {
      if (selectedGroup) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/familia/${selectedGroup}`
          );

          const options = response.data.map((fam) => (
            <option key={fam.codigo_fam} value={fam.codigo_fam}>
              {fam.name_fam}
            </option>
          ));
          setFamilyOptions(options);
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "No se pudieron cargar las familias",
            icon: "error",
          });
        }
      } else {
        // Si no hay grupo seleccionado, reiniciar las familias
        setFamilyOptions([]);
      }
    };
    cargarFamilias();
  }, [selectedGroup]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  // Funcion para manejar el submit del formulario
  // Se utiliza el hook handleSubmit de react-hook-form para manejar el submit del formulario
  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log("data", data);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/animal`,
        data
      );

      // Respuesta exitosa
      if (res.status === 200) {
        Swal.fire({
          title: "Registro Exitoso",
          text: "Animal registrado correctamente",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        router.push(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/auth/dashboard`);
        router.refresh();
      }
    } catch (error) {
      // Manejo de errores
      const codigoError = error.response?.status;
      const mensageError = error.response?.data?.message;

      // Caso para código de validacion (400)
      if (codigoError === 400) {
        Swal.fire({
          title: "Error de Registro",
          text: mensageError,
          icon: "error",
          confirmButtonColor: "#d33",
        });
        return;
      }

      // Error de duplicidad (400)
      if (codigoError === 409) {
        Swal.fire({
          title: "Error de Registro",
          text: mensageError,
          icon: "error",
          confirmButtonColor: "#d33",
        });
        return;
      }

      // Error interno del servidor (500)
      if (codigoError === 500) {
        Swal.fire({
          title: "Error de Registro",
          text: mensageError,
          icon: "error",
          confirmButtonColor: "#d33",
        });
        return;
      }
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
                  {...register("chip_ani")}
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
                  {...register("id_gru", {
                    onChange: (e) => {
                      const selectedOption =
                        e.target.options[e.target.selectedIndex];
                      const nombreGrupo =
                        selectedOption.getAttribute("data-nombre");
                      setSelectedGroup(e.target.value);
                      console.log("ID del Grupo:", e.target.value);
                      console.log("Nombre del Grupo:", nombreGrupo);
                      setValue("codigo_fam", ""); // Reinicia la familia seleccionada
                    },
                  })}
                >
                  <option value="">Grupo Animal</option>
                  {grupos.map((grupo) => (
                    <option
                      key={grupo.id_gru}
                      value={grupo.id_gru}
                      data-nombre={grupo.name_gru}
                    >
                      {grupo.name_gru}
                    </option>
                  ))}
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
                  {...register("codigo_fam")}
                  disabled={!selectedGroup} // Deshabilitar si no hay grupo seleccionado
                >
                  <option value="">Familia Animal</option>
                  {familyOptions}
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
                  {...register("sexo_ani", {
                    onChange: (e) => {
                      setSelectedSex(e.target.value);
                      // Actualiza el valor del campo de sexo según la opción seleccionada
                      if (e.target.value === "Macho") {
                        setValue("fechaPalpacion_ani", ""); // Reinicia la fecha de palpación si es hembra
                        setValue("tiempoGestacion_ani", ""); // Reinicia el tiempo de gestación si es hembra
                      }
                    },
                  })}
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
                  disabled={selectedSex !== "Hembra"} // Deshabilitar si es macho
                  {...register("fechaPalpacion_ani", {
                    required: {
                      value: selectedSex === "Hembra", // <-- Solo requerido para hembras
                      message: "campo requerido",
                    },
                  })}
                />
                {/* Manejo de Errores */}
                {errors.fechaPalpacion_ani && (
                  <span className="text-red-600 text-sm">
                    {errors.fechaPalpacion_ani.message}
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
                  disabled={selectedSex !== "Hembra"} // Deshabilitar si es macho
                  {...register("tiempoGestacion_ani", {
                    required: {
                      value: selectedSex === "Hembra", // <-- Solo requerido para hembras
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
                  {...register("peso_ani", {})}
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
                {/* 
                
                <input
                  type="text"
                  onChange={(e) =>
                    setValue("fechaNacimiento_ani", e.target.value)
                  }
                  onFocus={(e) => (e.target.type = "date")}
                  //onBlur={(e) => (e.target.type = "text")}
                  placeholder="Fecha de Nacimiento"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("fechaNacimiento_ani", {
                    required: {
                      value: true,
                      message: "campo requerido",
                    },
                  })}
                />
                {/* Manejo de Errores
                {errors.fechaNacimiento_ani && (
                  <span className="text-red-600 text-sm">
                    {errors.fechaNacimiento_ani.message}
                  </span>
                )}
                */}

                <FechaNacimientoInput
                  register={register}
                  setValue={setValue}
                  watch={watch}
                  error={errors.fechaNacimiento_ani}
                />
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
                  {...register("precio_ani", {})}
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

export default Animal;
