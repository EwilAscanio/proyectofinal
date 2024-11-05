import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

//Creo una constante para recibir como prop el id del usuario a eliminar.
const ButtonUpdate = async ({ user_id }) => {
  const router = useRouter();

  //Creo una funcion asincrona para manejar la eliminacion del usuario.
  const handleUpdate = async () => {
    //Utilizo SweetAlert2 para mostrar una alerta de confirmacion antes de eliminar el usuario.

    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    });

    if (result.isConfirmed) {
      try {
        const resp = await axios.put(
          `http://localhost:3000/api/update/${user_id}`
        );
        if (resp.status === 200) {
          Swal.fire({
            title: "Actualizar!",
            text: "El usuario ha sido actualizado",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
          router.push("/auth/dashboard/updateusers");
          router.refresh();
        }
      } catch (error) {
        Swal.fire("Error", "Ocurrió un error al eliminar el usuario.", "error");
      }
    }
  };

  return (
    <button
      className="cursor-pointer w-40 h-12 text-black rounded-xl hover:bg-blue-600 hover:shadow-lg transition-all hover:duration-300 ease-in-out hover:text-white text-lg flex items-center p-2 mt-8 jusify-center"
      onClick={handleUpdate}
    >
      Actualizar Usuario
    </button>
  );
};

export default ButtonUpdate;
