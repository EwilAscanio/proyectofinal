import axios from "axios";
import {
  LuUser,
  LuMail,
  LuPhone,
  LuArrowRight,
  LuMapPin,
  LuFileText,
} from "react-icons/lu";
import ButtonDelete from "@/components/ButtonDelete";
import EliminarCliente from "@/components/EliminarCliente";

const loadCliente = async (id) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/cliente/${id}`
  );

  return data;
};

const DeleteCliente = async ({ params }) => {
  const cliente = await loadCliente(params.id);

  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Eliminar Cliente</h1>
          <p className="text-gray-600 mt-2">Rellene los datos correctamente</p>
        </div>
        <form className="space-y-4">
          {/* Campo CÓDIGO */}
          <div className="relative">
            <LuFileText
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Código del Cliente"
              defaultValue={cliente.codigo_cli}
              readOnly
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
              defaultValue={cliente.nombre_cli}
              readOnly
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
              defaultValue={cliente.email_cli}
              readOnly
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
              defaultValue={cliente.telefono_cli}
              readOnly
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
              defaultValue={cliente.direccion_cli}
              readOnly
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
              defaultValue={cliente.rif_cli}
              readOnly
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Boton de Eliminar Cliente */}
          <EliminarCliente codigo_cli={cliente.codigo_cli} />
        </form>
      </div>
    </div>
  );
};

export default DeleteCliente;
