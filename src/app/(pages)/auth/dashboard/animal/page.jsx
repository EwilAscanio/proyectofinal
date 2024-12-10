import axios from "axios";
import Link from "next/link";

const loadAnimal = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/animal`
  );
  console.log("DATA ANIMALES", data.infoAnimales);
  console.log("DATA TOTAL ANIMALES", data.total);

  return {
    animals: data.infoAnimales,
    total: data.total,
  };
};

const ListAnimal = async () => {
  const { animals, total } = await loadAnimal();

  console.log("TOTAL ANIMALES", total);
  console.log("ANIMALES", animals);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Meses son 0-indexados
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const animalsFormat = animals.map((animal) => ({
    ...animal,

    fechaVacunacion_ani: formatDate(animal.fechaVacunacion_ani),
  }));

  return (
    <>
      <div>
        <h1 className="text-center text-3xl font-bold mb-4 mt-4">
          Lista de Animales
        </h1>

        <Link
          href={"/auth/dashboard/animal/registraranimal"}
          className="bg-blue-500 text-white py-1 px-3 rounded hover:underline absolute right-0 top-0 mr-4 mt-4"
        >
          Crear Animal
        </Link>
      </div>
      <div className="p-4 overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200">Codigo</th>
              <th className="py-2 px-4 bg-gray-200">Nombre</th>
              <th className="py-2 px-4 bg-gray-200">Sexo</th>
              <th className="py-2 px-4 bg-gray-200">Vacunacion</th>
              <th className="py-2 px-4 bg-gray-200">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {animalsFormat.map((animal) => (
              <tr key={animal.codigo_ani} className="text-center border-t">
                <td className="py-2 px-4">{animal.codigo_ani}</td>

                <td className="py-2 px-4">{animal.nombre_ani}</td>
                <td className="py-2 px-4">{animal.sexo_ani}</td>
                <td className="py-2 px-4">{animal.fechaVacunacion_ani}</td>
                <td className="py-2 px-4">
                  <Link
                    href={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/auth/dashboard/animal/updateanimal/${animal.codigo_ani}`}
                  >
                    <button className="bg-blue-500 text-white py-1 px-3 rounded mr-2">
                      Actualizar
                    </button>
                  </Link>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/auth/dashboard/animal/deleteanimal/${animal.codigo_ani}`}
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

export default ListAnimal;
