import axios from "axios";
import Link from "next/link";
import ImagenProfile from "@/images/8380015.jpg";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const loadUsers = async () => {
  const { data } = await axios.get("http://localhost:3000/api/users");
  console.log("DATA RECIBIDA GET", data);
  return data;
};

const UsersPage = async () => {
  const users = await loadUsers();
  const sesion = await getServerSession(authOptions);
  console.log("Sesion:", sesion);
  console.log("Sesion User:", sesion.user);
  console.log("Sesion User:", sesion.user.name);
  console.log("Sesion User:", sesion.user.email);

  console.log("USUARIOS RECIBIDOS", users);

  return (
    <>
      <div>
        <h1 className="text-center text-3xl font-bold mb-4 mt-4">
          Lista de Usuarios
        </h1>
      </div>
      <div className="p-4 overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200">Nombre</th>
              <th className="py-2 px-4 bg-gray-200">Correo</th>
              <th className="py-2 px-4 bg-gray-200">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id_usr} className="text-center border-t">
                <td className="py-2 px-4">{user.name_usr}</td>
                <td className="py-2 px-4">{user.email_usr}</td>
                <td className="py-2 px-4">
                  <Link
                    href={`/auth/dashboard/listusers/updateusers/${user.id_usr}`}
                  >
                    <button className="bg-blue-500 text-white py-1 px-3 rounded mr-2">
                      Actualizar
                    </button>
                  </Link>
                  {sesion.user.email !== user.email_usr && (
                    <Link
                      href={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/auth/dashboard/listusers/deleteusers/${user.id_usr}`}
                    >
                      <button className="bg-red-500 text-white py-1 px-3 rounded">
                        Eliminar
                      </button>
                    </Link>
                  )}
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
