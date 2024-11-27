import axios from "axios";
import Link from "next/link";

const loadCliente = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/cliente`
  );
  console.log("DATA RECIBIDA GET", data);
  return data;
};

const UsersPage = async () => {
  const clientes = await loadCliente();

  console.log("CLIENTES RECIBIDOS", clientes);

  return (
    <>
      <div>
        <h1 className="text-center text-3xl font-bold mb-4 mt-4">
          Lista de Clientes
        </h1>

        <Link
          href={"/auth/dashboard/cliente/registrarcliente"}
          className="bg-blue-500 text-white py-1 px-3 rounded hover:underline absolute right-0 top-0 mr-4 mt-4"
        >
          Crear Cliente
        </Link>
      </div>
      <div className="p-4 overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200">Codigo</th>
              <th className="py-2 px-4 bg-gray-200">Nombre</th>
              <th className="py-2 px-4 bg-gray-200">Telefono</th>
              <th className="py-2 px-4 bg-gray-200">Rif</th>
              <th className="py-2 px-4 bg-gray-200">Email</th>
              <th className="py-2 px-4 bg-gray-200">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={clientes.codigo_cli} className="text-center border-t">
                <td className="py-2 px-4">{cliente.codigo_cli}</td>

                <td className="py-2 px-4">{cliente.nombre_cli}</td>
                <td className="py-2 px-4">{cliente.telefono_cli}</td>
                <td className="py-2 px-4">{cliente.rif_cli}</td>
                <td className="py-2 px-4">{cliente.email_cli}</td>
                <td className="py-2 px-4">
                  <Link
                    href={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/auth/dashboard/cliente/updatecliente/${cliente.codigo_cli}`}
                  >
                    <button className="bg-blue-500 text-white py-1 px-3 rounded mr-2">
                      Actualizar
                    </button>
                  </Link>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/auth/dashboard/cliente/deletecliente/${cliente.codigo_cli}`}
                  >
                    <button className="bg-red-500 text-white py-1 px-3 rounded">
                      Eliminar
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersPage;
