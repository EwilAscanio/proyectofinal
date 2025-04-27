"use client";
import axios from "axios";
import {
  LuUser,
  LuUserCircle,
  LuMail,
  LuTag,
  LuScale,
  LuCalendar,
  LuActivity,
  LuDollarSign,
  LuLoader2,
  LuHourglass,
  LuUsers,
} from "react-icons/lu"; // LuLock y LuArrowRight no se usan, se pueden eliminar
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import clsx from "clsx"; // clsx no se usa, se puede eliminar
import { useEffect, useState } from "react";

const baseInputClass = `
  w-full pl-10 pr-3 py-2 border rounded-lg text-sm
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
  text-gray-700
  disabled:bg-gray-100 disabled:cursor-not-allowed
`;

const DeleteAnimal = ({ params }) => {
  const router = useRouter();
  const [animal, setAnimal] = useState(null);
  const [grupo, setGrupo] = useState("");
  const [familia, setFamilia] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnimal = async (id) => {
      try {
        console.log(`Iniciando carga para animal con ID: ${id}`);
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/animal/${id}`
        );
        setAnimal(data);
        console.log("1. Datos del Animal recibidos:", data); // Cargar grupo basado en el ID

        if (data.id_gru) {
          console.log("2. id_gru encontrado en animal:", data.id_gru);
          try {
            const grupoResponse = await axios.get(
              `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/grupoAnimales/${data.id_gru}`
            );
            console.log("3. Respuesta API Grupo:", grupoResponse.data); // Asegúrate de que grupoResponse.data y name_gru existen y no son null/undefined
            if (grupoResponse.data && grupoResponse.data.name_gru != null) {
              // == null checks for undefined and null
              const groupName = grupoResponse.data.name_gru;
              setGrupo(groupName);
              console.log("4. Grupo establecido a:", groupName);
            } else {
              setGrupo("N/A");
              console.log(
                "5. Datos de grupo o name_gru faltantes/null en la respuesta."
              );
            }
          } catch (grupoError) {
            console.error("Error al cargar el grupo:", grupoError);
            setGrupo("Error al cargar grupo");
          }
        } else {
          setGrupo("N/A"); // Si id_gru no existe en el animal
          console.log(
            "6. id_gru falta en los datos del animal. Grupo establecido a N/A."
          );
        } // Cargar familia basado en el codigo_fam

        if (data.codigo_fam) {
          console.log("7. codigo_fam encontrado en animal:", data.codigo_fam);
          try {
            const familiaResponse = await axios.get(
              `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/familia/${data.codigo_fam}` // **CORREGIDO: Usar data.codigo_fam**
            );
            console.log("8. Respuesta API Familia:", familiaResponse.data);
            console.log("9. Status API Familia:", familiaResponse.status); // Verificar la estructura de la respuesta de la familia // Basado en tu log ([]), la API puede devolver un array.

            if (
              familiaResponse.data &&
              Array.isArray(familiaResponse.data) &&
              familiaResponse.data.length > 0 &&
              familiaResponse.data[0].name_fam != null
            ) {
              const familyName = familiaResponse.data[0].name_fam;
              setFamilia(familyName);
              console.log(
                "10. Familia establecida a (desde array):",
                familyName
              );
            } // Si la API devuelve un objeto directo (menos probable dado tu log [], pero posible):
            else if (
              familiaResponse.data &&
              familiaResponse.data.name_fam != null
            ) {
              const familyName = familiaResponse.data.name_fam;
              setFamilia(familyName);
              console.log(
                "10. Familia establecida a (desde objeto):",
                familyName
              );
            } else {
              setFamilia("N/A");
              console.log(
                "11. Datos de familia, name_fam o array faltantes/null en la respuesta."
              );
            }
          } catch (familiaError) {
            console.error("Error al cargar la familia:", familiaError);
            setFamilia("Error al cargar familia"); // Indicar error de carga
          }
        } else {
          setFamilia("N/A"); // Si codigo_fam no existe en el animal
          console.log(
            "12. codigo_fam falta en los datos del animal. Familia establecida a N/A."
          );
        }
      } catch (error) {
        console.error("Error al cargar el animal (fetch inicial):", error);
        setAnimal(null); // Asegurarse de que animal es null si falla la carga inicial
        setGrupo("N/A"); // Establecer valores por defecto en caso de fallo inicial
        setFamilia("N/A");
      } finally {
        setLoading(false);
        console.log(
          "13. Carga finalizada. Grupo actual:",
          grupo,
          "Familia actual:",
          familia
        ); // Log final de estados
      }
    };

    loadAnimal(params.id);
  }, [params.id]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará permanentemente el animal.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/animal/${params.id}`
        );
        Swal.fire("Eliminado", "El animal ha sido eliminado.", "success");
        router.push("/auth/dashboard/animal");
      } catch (error) {
        Swal.fire(
          "Error",
          "Ocurrió un error al intentar eliminar el animal.",
          "error"
        );
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <LuLoader2 className="animate-spin text-blue-500" size={50} />
          <p className="mt-4 text-gray-600 text-lg">Cargando datos...</p>
        </div>
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>No se encontró el animal.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4 min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 max-w-4xl w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Eliminar Animal
          </h1>

          <p className="text-gray-600 text-sm">
            Confirma los datos antes de eliminar este animal.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Campo CODIGO ANIMAL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Código Animal
            </label>

            <div className="relative">
              <LuUser
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />

              <input
                type="text"
                value={animal.codigo_ani}
                readOnly
                className={baseInputClass}
              />
            </div>
          </div>
          {/* Campo NOMBRE ANIMAL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre Animal
            </label>

            <div className="relative">
              <LuUserCircle
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />

              <input
                type="text"
                value={animal.nombre_ani}
                readOnly
                className={baseInputClass}
              />
            </div>
          </div>
          {/* Campo SEXO */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sexo
            </label>
            <div className="relative">
              <input
                type="text"
                value={animal.sexo_ani}
                readOnly
                className={baseInputClass}
              />
            </div>
          </div>
          {/* Campo CHIP */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chip
            </label>
            <div className="relative">
              <LuMail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />

              <input
                type="text"
                value={animal.chip_ani || "N/A"}
                readOnly
                className={baseInputClass}
              />
            </div>
          </div>
          {/* Campo GRUPO ANIMAL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grupo Animal
            </label>

            <div className="relative">
              <LuUsers
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />

              <input
                type="text"
                value={grupo} // Display the loaded grupo name
                readOnly
                className={baseInputClass}
              />
            </div>
          </div>
          {/* Campo FAMILIA ANIMAL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Familia Animal
            </label>

            <div className="relative">
              <LuUsers
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />

              <input
                type="text"
                value={familia} // Display the loaded familia name
                readOnly
                className={baseInputClass}
              />
            </div>
          </div>
          {/* Campo ARETE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Arete
            </label>

            <div className="relative">
              <LuTag
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />

              <input
                type="text"
                value={animal.arete_ani || "N/A"}
                readOnly
                className={baseInputClass}
              />
            </div>
          </div>
          {/* Campo PESO */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Peso (Kg)
            </label>

            <div className="relative">
              <LuScale
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />

              <input
                type="text"
                value={animal.peso_ani || "N/A"}
                readOnly
                className={baseInputClass}
              />
            </div>
          </div>
          {/* Campo FECHA DE PALPACIÓN */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de Palpación
            </label>

            <div className="relative">
              <LuCalendar
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />

              <input
                type="text"
                value={formatDate(animal.fechaPalpacion_ani)}
                readOnly
                className={baseInputClass}
              />
            </div>
          </div>
          {/* Campo TIEMPO DE GESTACIÓN */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tiempo de Gestación
            </label>

            <div className="relative">
              <LuHourglass
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />

              <input
                type="text"
                value={animal.tiempoGestacion_ani || "N/A"}
                readOnly
                className={baseInputClass}
              />
            </div>
          </div>
          {/* Campo FECHA DE NACIMIENTO */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de Nacimiento
            </label>

            <div className="relative">
              <LuCalendar
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />

              <input
                type="text"
                value={formatDate(animal.fechaNacimiento_ani)}
                readOnly
                className={baseInputClass}
              />
            </div>
          </div>
          {/* Campo FECHA ÚLTIMA VACUNACIÓN */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha Última Vacunación
            </label>

            <div className="relative">
              <LuCalendar
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />

              <input
                type="text"
                value={formatDate(animal.fechaVacunacion_ani)}
                readOnly
                className={baseInputClass}
              />
            </div>
          </div>
          {/* Campo STATUS */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>

            <div className="relative">
              <LuActivity
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />

              <input
                type="text"
                value={animal.status_ani === 1 ? "Activo" : "Inactivo"}
                readOnly
                className={baseInputClass}
              />
            </div>
          </div>
          {/* Campo PRECIO */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Precio
            </label>

            <div className="relative">
              <LuDollarSign
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />

              <input
                type="text"
                value={animal.precio_ani || "N/A"}
                readOnly
                className={baseInputClass}
              />
            </div>
          </div>
        </div>
        {/* Botón de Confirmación */}
        <div className="mt-6">
          <button
            onClick={handleDelete}
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300 flex items-center justify-center text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Eliminar Animal
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAnimal;
