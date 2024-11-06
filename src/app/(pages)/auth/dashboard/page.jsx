import Imagen from "next/image";
import Link from "next/link";
import { FaUsers, FaFileInvoiceDollar } from "react-icons/fa";
import { LuMilk } from "react-icons/lu";

const page = () => {
  return (
    <div>
      <div className="flex  bg-gray-100">
        {/* Card Numero 1 Total Animales */}
        <div className="flex max-w-sm gap-5 bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-blue-200 mx-auto mt-10 justify-between ">
          <div className="p-5">
            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
              Total Animales
            </h5>
            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 ">
              40.685
            </h5>
          </div>

          <div className="flex items-center justify-center bg-blue-500 rounded-t-lg p-5">
            <FaUsers className="w-full h-10 text-white" />
          </div>
        </div>

        {/* Card Numero 2 Total Litros de Leche */}
        <div className="flex max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-blue-200 mx-auto mt-10 justify-between">
          <div className="p-5">
            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
              Total Litros de Leche
            </h5>
            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 ">
              10.293
            </h5>
          </div>

          <div className="flex items-center justify-center bg-green-500 rounded-t-lg p-5">
            <LuMilk className="w-full h-10 text-white" />
          </div>
        </div>

        {/* Card Numero 3 Total de Inventario */}
        <div className="flex max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-blue-200 mx-auto mt-10 justify-between">
          <div className="p-5">
            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
              Total de Inventario
            </h5>
            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 ">
              89.600 $
            </h5>
          </div>

          <div className="flex items-center justify-center bg-red-500 rounded-t-lg p-5">
            <FaFileInvoiceDollar className="w-full h-10 text-white" />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default page;
