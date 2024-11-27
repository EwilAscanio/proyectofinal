import Sidebar from "@/components/Sidebar";
import NavRight from "@/components/NavRight";
import Image from "next/image";
import Logo from "@/images/Logo.png";

export default function Layout({ children }) {
  return (
    <>
      {/* Inicio de Layout */}
      <div className="grid grid-cols-[20%,1fr,1fr] grid-rows-[10%,1fr] gap-4 bg-white h-[100vh]">
        {/* Inicio del Grid Fila 1 */}
        <div className="">
          <div className="flex items-center justify-center h-[100%]">
            <Image
              src={Logo}
              className=" mt-6 object-contain w-36 h-auto"
              alt="Logo Dashboard"
              priority
            ></Image>
          </div>
        </div>
        {/* Inicio de la Fila numero 2 */}

        <div className="col-span-2 flex items-center justify-center">
          <div className="w-full h-full flex items-center justify-around">
            <NavRight />
          </div>
        </div>

        {/* Inicio de la Fila numero 3 */}
        <div className="row-span-6 row-start-2 mt-4">
          <Sidebar />
        </div>

        {/* Inicio de la fila numero 4 */}
        <div className="col-span-2 row-span-6 row-start-2  flex flex-col items-center justify-center ">
          {/* Inicio del Children */}
          <div className="relative bg-slate-100 w-[100%] h-[100%] overflow-y-auto rounded-3xl">
            <main className="absolute w-full overflow-auto rounded-xl">
              {children}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
