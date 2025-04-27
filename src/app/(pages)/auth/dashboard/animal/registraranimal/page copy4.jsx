"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  // Nuevos iconos sugeridos (importa los que necesites):
  LuHash, // Para Código Animal
  LuSignature, // Para Nombre Animal
  LuUsers, // Para Grupo / Sexo (o usa LuVenetianMask para sexo)
  LuGitBranch, // Para Familia
  LuVenetianMask, // Alternativa para Sexo (íconos masculino/femenino)
  LuScanLine, // Para Chip
  LuScale, // Para Peso
  LuTag, // Para Arete
  LuHourglass, // Para Tiempo Gestación
  LuSyringe, // Para Fecha Vacunación
  LuActivity, // Para Status
  LuDollarSign, // Para Precio
  // Iconos existentes que mantenemos o usamos:
  LuArrowRight,
  LuCalendar,
  LuUserCircle, // Aún se usa en algunos por defecto o si prefieres mantenerlos
} from "react-icons/lu";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import FechaNacimientoInput from "@/components/FechaNacimientoInput"; // Asegúrate que la ruta sea correcta

const Animal = () => {
  const router = useRouter();
  const [selectedGroup, setSelectedGroup] = useState("");
  const [familyOptions, setFamilyOptions] = useState([]);
  const [selectedSex, setSelectedSex] = useState("");
  const [grupos, setGrupos] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      codigo_ani: "",
      nombre_ani: "",
      chip_ani: "",
      id_gru: "",
      codigo_fam: "",
      sexo_ani: "",
      fechaPalpacion_ani: "",
      tiempoGestacion_ani: "",
      peso_ani: "",
      arete_ani: "",
      fechaNacimiento_ani: "",
      fechaVacunacion_ani: "",
      status_ani: "1",
      precio_ani: "",
    },
  });

  // --- useEffects y onSubmit (sin cambios en su lógica interna) ---
  // UseEffect para cargar los grupos de animales al inicio
  useEffect(() => {
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
          /* ... */
        });
      }
    };
    cargarGrupo();
  }, []);

  //UseEffect para cargar las familias de animales al seleccionar un grupo
  useEffect(() => {
    const cargarFamilias = async () => {
      if (selectedGroup) {
        try {
          const response = await axios.get(
            `<span class="math-inline">\{process\.env\.NEXT\_PUBLIC\_NEXTAUTH\_URL\}/api/familia/</span>{selectedGroup}`
          );
          const options = response.data.map((fam) => ({
            value: fam.codigo_fam,
            label: fam.name_fam,
          }));
          setFamilyOptions(options);
        } catch (error) {
          Swal.fire({
            /* ... */
          });
          setFamilyOptions([]);
        }
      } else {
        setFamilyOptions([]);
      }
    };
    cargarFamilias();
  }, [selectedGroup]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const dataToSend = {
        ...data,
        peso_ani: data.peso_ani ? parseFloat(data.peso_ani) : null,
        precio_ani: data.precio_ani ? parseFloat(data.precio_ani) : null,
        status_ani: parseInt(data.status_ani, 10),
        // Asegúrate que las fechas se manejen bien (null si es opcional y vacía)
        fechaPalpacion_ani: data.fechaPalpacion_ani || null,
      };

      console.log("Datos a enviar:", dataToSend);
      const res = await axios.post(/* ... */);

      if (res.status === 200) {
        Swal.fire({
          /* ... */
        });
        router.push(`/auth/dashboard`);
        router.refresh();
      }
    } catch (error) {
      console.error("Error en onSubmit:", error.response || error);
      const codigoError = error.response?.status;
      const mensageError =
        error.response?.data?.message || "Ocurrió un error inesperado.";
      Swal.fire({
        title: `Error ${codigoError ? `(${codigoError})` : ""}`,
        text: mensageError,
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  });
  // --- Fin useEffects y onSubmit ---

  // Estilo común para labels
  const labelClass = "block mb-1 text-sm font-medium text-gray-700";

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* --- Campos con iconos actualizados --- */}

              {/* Campo CODIGO ANIMAL */}
              <div className="relative">
                <LuHash // Icono cambiado
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Código Animal *"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("codigo_ani", {
                    /* ...validaciones... */
                  })}
                />
                {errors.codigo_ani}
              </div>

              {/* Campo NOMBRE ANIMAL */}
              <div className="relative">
                <LuSignature // Icono cambiado
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Nombre Animal *"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("nombre_ani", {
                    /* ...validaciones... */
                  })}
                />
                {errors.nombre_ani}
              </div>

              {/* Campo GRUPO ANIMAL */}
              <div className="relative">
                <LuUsers // Icono cambiado
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <select
                  /* ... */ {...register("id_gru", {
                    /* ... */
                  })}
                >
                  {/* ... */}
                </select>
                <LuArrowRight /* ... */ />
                {errors.id_gru}
              </div>

              {/* Campo FAMILIA ANIMAL */}
              <div className="relative">
                <LuGitBranch // Icono cambiado
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <select
                  /* ... */ {...register("codigo_fam", {
                    /* ... */
                  })}
                >
                  {/* ... */}
                </select>
                <LuArrowRight /* ... */ />
                {errors.codigo_fam}
              </div>

              {/* Campo SEXO ANIMAL */}
              <div className="relative">
                <LuVenetianMask // Icono cambiado
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <select
                  /* ... */ {...register("sexo_ani", {
                    /* ... */
                  })}
                >
                  {/* ... */}
                </select>
                <LuArrowRight /* ... */ />
                {errors.sexo_ani}
              </div>

              {/* Campo CHIP ANIMAL */}
              <div className="relative">
                <LuScanLine // Icono cambiado
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Chip (Opcional)"
                  /* ... */ {...register("chip_ani")}
                />
              </div>

              {/* Campo PESO ANIMAL */}
              <div className="relative">
                <LuScale // Icono cambiado
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="number"
                  step="0.1"
                  placeholder="Peso (Kg) (Opcional)"
                  /* ... */ {...register("peso_ani", {
                    /* ... */
                  })}
                />
                {errors.peso_ani}
              </div>

              {/* Campo ARETE ANIMAL */}
              <div className="relative">
                <LuTag // Icono cambiado
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Arete (Opcional)"
                  /* ... */ {...register("arete_ani", {
                    /* ... */
                  })}
                />
                {errors.arete_ani}
              </div>

              {/* --- Campos de Fecha con Label --- */}

              {/* Campo FECHA PALPACION (condicional) */}
              <div>
                {" "}
                {/* Contenedor para label + input */}
                <label htmlFor="fechaPalpacion_ani" className={labelClass}>
                  Fecha Palpación {selectedSex === "Hembra" ? "*" : "(Hembra)"}
                </label>
                <div className="relative">
                  <LuCalendar
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="date"
                    id="fechaPalpacion_ani" // ID añadido para el label
                    // placeholder removido
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    disabled={selectedSex !== "Hembra"}
                    {...register("fechaPalpacion_ani", {
                      required:
                        selectedSex === "Hembra"
                          ? "La fecha de palpación es requerida para hembras"
                          : false,
                    })}
                  />
                </div>
                {errors.fechaPalpacion_ani && (
                  <span className="text-red-600 text-sm mt-1 block">
                    {errors.fechaPalpacion_ani.message}
                  </span>
                )}
              </div>

              {/* Campo TIEMPO DE GESTACION (condicional) */}
              <div className="relative">
                <LuHourglass // Icono cambiado
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Gestación (días/meses) (Hembra)"
                  /* ... */ {...register("tiempoGestacion_ani", {
                    /* ... */
                  })}
                />
                {errors.tiempoGestacion_ani}
              </div>

              {/* Campo FECHA NACIMIENTO */}
              <div>
                {" "}
                {/* Contenedor para label + input */}
                <label htmlFor="fechaNacimiento_ani" className={labelClass}>
                  Fecha de Nacimiento *
                </label>
                {/* No necesita div relativo extra si el componente hijo ya lo tiene */}
                <FechaNacimientoInput
                  name="fechaNacimiento_ani" // Usado como ID dentro del componente
                  // label="Fecha de Nacimiento *" // El 'label' prop ya no es necesario como placeholder
                  registerProps={register("fechaNacimiento_ani", {
                    required: "La fecha de nacimiento es requerida",
                    validate: (value) => {
                      const today = new Date();
                      const selectedDate = new Date(value);
                      today.setHours(0, 0, 0, 0);
                      selectedDate.setHours(0, 0, 0, 0);
                      return (
                        selectedDate <= today || "La fecha no puede ser futura"
                      );
                    },
                  })}
                  error={errors.fechaNacimiento_ani}
                  IconComponent={LuCalendar} // Puedes mantener o cambiar el ícono aquí también
                />
              </div>

              {/* Campo FECHA VACUNACION */}
              <div>
                {" "}
                {/* Contenedor para label + input */}
                <label htmlFor="fechaVacunacion_ani" className={labelClass}>
                  Fecha Última Vacunación *
                </label>
                <div className="relative">
                  <LuSyringe // Icono cambiado
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="date"
                    id="fechaVacunacion_ani" // ID añadido para el label
                    // placeholder removido
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("fechaVacunacion_ani", {
                      required: "La fecha de vacunación es requerida",
                    })}
                  />
                </div>
                {errors.fechaVacunacion_ani && (
                  <span className="text-red-600 text-sm mt-1 block">
                    {errors.fechaVacunacion_ani.message}
                  </span>
                )}
              </div>

              {/* Campo STATUS ANIMAL */}
              <div className="relative">
                <LuActivity // Icono cambiado
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <select
                  defaultValue="1"
                  /* ... */ {...register("status_ani", {
                    /* ... */
                  })}
                >
                  <option value="1">Activo</option>
                  <option value="2">Inactivo</option>
                </select>
                <LuArrowRight />
                {errors.status_ani}
              </div>

              {/* Campo PRECIO ANIMAL*/}
              <div className="relative">
                <LuDollarSign // Icono cambiado
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Precio (Opcional)"
                  /* ... */ {...register("precio_ani", {
                    /* ... */
                  })}
                />
                {errors.precio_ani}
              </div>

              {/* Botón de Envío */}
              <button type="submit" className="md:col-span-2 /* ... */">
                Registrar Animal
                <LuArrowRight className="ml-2" size={20} />
              </button>
            </div>{" "}
            {/* Fin del grid */}
          </form>
        </div>
      </div>
    </>
  );
};

export default Animal;
