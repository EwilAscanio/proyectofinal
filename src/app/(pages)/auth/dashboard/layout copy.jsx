import Sidebar from "@/components/Sidebar";
import NavRight from "@/components/NavRight";
import Image from "next/image";
import Logo from "@/images/Logo.png";

export default function Layout({ children }) {
  return (
    <>
      {/* Inicio de Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[20%,1fr] lg:grid-cols-[20%,1fr,1fr] grid-rows-[auto,auto,1fr] gap-4 bg-white h-screen">
        {/* Fila 1: Logo */}
        <div className="flex items-center justify-center p-4">
          <Image
            src={Logo}
            className="object-contain w-36 h-auto"
            alt="Logo Dashboard"
            priority
          />
        </div>

        {/* Fila 2: Navegación */}
        <div className="col-span-2 flex items-center justify-center p-4">
          <NavRight />
        </div>

        {/* Fila 3: Sidebar */}
        <div className="row-span-1 md:row-span-2">
          <Sidebar />
        </div>

        {/* Fila 4: Contenido Principal */}
        <div className="col-span-2 row-span-1 flex flex-col items-center justify-center p-4">
          <div className="relative bg-slate-100 w-full h-full overflow-y-auto rounded-3xl">
            <main className="absolute w-full h-full overflow-auto rounded-xl">
              {children}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
