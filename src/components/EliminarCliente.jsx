"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useCallback } from "react";
import { LuArrowRight } from "react-icons/lu";

const EliminarCliente = ({ codigo_cli }) => {
  const router = useRouter();

  //Utilizo el hook useCallback para evitar que se ejecute la función en cada renderizado
  const handleDelete = useCallback(
    //Evento de click del botón de eliminar, prevengo cualquier comportamiento predeterminado, de recarga de la página.
    async (event) => {
      event.preventDefault(); // Prevenir cualquier comportamiento predeterminado

      try {
        // Mostrar alerta de confirmación
        const result = await Swal.fire({
          title: "¿Estás seguro?",
          text: "No podrás revertir esta acción",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, eliminar",
          cancelButtonText: "Cancelar",
        });

        // Verificar si el usuario confirmó la acción
        if (result.isConfirmed) {
          // Eliminar usuario mediante petición a la API
          const resp = await axios.delete(
            `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/cliente/${codigo_cli}`
          );

          if (resp.status === 200) {
            // Mostrar alerta de éxito
            await Swal.fire({
              title: "Eliminado!",
              text: "El Cliente ha sido eliminado",
              icon: "success",
              confirmButtonColor: "#3085d6",
            });

            // Redirigir al usuario después de la eliminación
            router.push(
              `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/auth/dashboard/cliente`
            );
            router.refresh();
          }
        }
      } catch (error) {
        // Mostrar alerta de error
        await Swal.fire(
          "Error",
          "Ocurrió un error al eliminar el cluente.",
          "error"
        );
      }
    },
    [codigo_cli, router]
  );

  return (
    <button
      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center mt-6"
      onClick={handleDelete}
    >
      Eliminar Cliente
      <LuArrowRight className="ml-2" size={20} />
    </button>
  );
};

export default EliminarCliente;
