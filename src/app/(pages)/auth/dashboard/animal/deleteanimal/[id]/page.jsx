import axios from "axios";
import {
  LuUser,
  LuUserCircle,
  LuMail,
  LuLock,
  LuArrowRight,
} from "react-icons/lu";
import EliminarAnimal from "@/components/EliminarAnimal";

const loadAnimal = async (id) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/animal/${id}`
  );

  return data;
};

const DeleteAnimal = async ({ params }) => {
  const animal = await loadAnimal(params.id);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Meses son 0-indexados
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const fechaPalpacion = formatDate(animal.fechaPalpacion_ani);
  const fechaNacimiento = formatDate(animal.fechaNacimiento_ani);
  const fechaVacunacion = formatDate(animal.fechaVacunacion_ani);

  return (
    <>
      <div className="flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Eliminar Animal
            </h1>
            <p className="text-gray-600 mt-2">Datos a Eliminar</p>
          </div>
          <form className="space-y-4">
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
                  defaultValue={animal.codigo_ani}
                  readOnly
                />
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
                  defaultValue={animal.nombre_ani}
                  readOnly
                />
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
                  defaultValue={animal.chip_ani}
                  readOnly
                />
              </div>

              {/* Campo numero 4 del Formulario GRUPO ANIMAL */}
              <div className="relative">
                <select
                  className="text-gray-400 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  defaultValue={animal.id_gru}
                  disabled
                >
                  <option value="">Grupo Animal</option>
                  <option value="1">Bobinos</option>
                  <option value="2">Becerros</option>
                  <option value="3">Caballos</option>
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
                  defaultValue={animal.id_fam}
                  disabled
                >
                  <option value="">Familia Animal</option>
                  <option value="1">Toros</option>
                  <option value="2">Vacas</option>
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
                  defaultValue={animal.sexo_ani}
                  disabled
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
                  placeholder="Fecha Palpacion"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={fechaPalpacion}
                  readOnly
                />
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
                  defaultValue={animal.tiempoGestacion_ani}
                  readOnly
                />
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
                  defaultValue={animal.peso_ani}
                  readOnly
                />
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
                  defaultValue={animal.arete_ani}
                  readOnly
                />
              </div>

              {/* Campo numero 11 del Formulario FECHA NACIMIENTO */}
              <div className="relative">
                <LuLock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Fecha de Nacimiento"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={fechaNacimiento}
                  readOnly
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
                  placeholder="Fecha de Vacunacion"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={fechaVacunacion}
                  readOnly
                />
              </div>

              {/* Campo numero 13 del Formulario STATUS ANIMAL */}
              <div className="relative">
                <select
                  className="text-gray-400 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  defaultValue={animal.status_ani}
                  disabled
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
                  defaultValue={animal.precio_ani}
                  readOnly
                />
              </div>

              <EliminarAnimal codigo_ani={animal.codigo_ani} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DeleteAnimal;
