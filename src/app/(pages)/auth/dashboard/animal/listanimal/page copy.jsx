import axios from "axios";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const loadAnimal = async () => {
  const { data } = await axios.get("http://localhost:3000/api/animal");
  console.log("DATA RECIBIDA GET", data);
  return data;
};

const UsersPage = async () => {
  const animals = await loadAnimal();

  console.log("ANIMALES RECIBIDOS", animals);

  return (
    <>
      <div>
        <h1 className="text-center text-3xl font-bold mb-4 mt-4">
          Lista de Animales
        </h1>
      </div>
      <div className="p-4 overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200">Código</th>
              <th className="py-2 px-4 bg-gray-200">Nombre</th>
              <th className="py-2 px-4 bg-gray-200">Sexo</th>
              <th className="py-2 px-4 bg-gray-200">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(animals) && animals.length > 0 ? (
              animals.map((animal) => (
                <tr key={animal.codigo_ani} className="text-center border-t">
                  <td className="py-2 px-4">{animal.codigo_ani}</td>
                  <td className="py-2 px-4">{animal.nombre_ani}</td>
                  <td className="py-2 px-4">{animal.sexo_ani}</td>
                  <td className="py-2 px-4">
                    <Link
                      href={`/auth/dashboard/updateusers/${animal.codigo_ani}`}
                    >
                      <button className="bg-blue-500 text-white py-1 px-3 rounded mr-2">
                        Actualizar
                      </button>
                    </Link>
                    <Link href={`/auth/dashboard/animal/${animal.codigo_ani}`}>
                      <button className="bg-red-500 text-white py-1 px-3 rounded">
                        Eliminar
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No hay animales disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersPage;
