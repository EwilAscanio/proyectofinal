import React from "react";
import Image from "next/image";
import logo from "@/images/logo.jpg";
import Button from "./Button";

import { MdDashboardCustomize } from "react-icons/md";
import {
  FaCow,
  FaUsers,
  FaUserShield,
  FaBriefcaseMedical,
  FaWeightScale,
  FaHeart,
  FaHorseHead,
  FaPercent,
  FaChartLine,
} from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";
import NavRight from "./NavRight";
import { Sidebar } from "lucide-react";

const Layout = () => {
  return (
    <>
      {/* Inicio de Layout */}
      <div className="grid grid-cols-[20%,1fr,1fr] grid-rows-[10%,1fr] gap-4 bg-white h-[100vh] ">
        {/* Inicio del Grid Fila 1 */}

        <div className="">
          <div className="flex items-center justify-center h-[100%]">
            <Image src={logo} alt="Logo" width={300} height={600}></Image>
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
          {/* <div className="flex flex-col gap-1 items-center">
            <h2 className="font-bold underline text-blue-800 drop-shadow-lg text-lg">
              Menu Principal
            </h2>
            <Button
              url={"/dashboard"}
              content="Dashboard"
              icono={<MdDashboardCustomize />}
            />
            <Button url={"/"} content="Ficha Animal" icono={<FaHorseHead />} />
            <Button url={""} content="Clientes" icono={<FaUsers />} />
            <Button url={""} content="Usuarios" icono={<FaUserShield />} />
            <Button url={""} content="Reportes" icono={<TbReportAnalytics />} />
          </div>

          <div className="flex flex-col gap-3 items-center">
            <h2 className="mt-4 font-bold underline text-blue-800 drop-shadow-lg text-lg">
              Procesos
            </h2>
            <Button
              url={""}
              content="Vacunacion"
              icono={<FaBriefcaseMedical />}
            />
            <Button url={""} content="Pesaje" icono={<FaWeightScale />} />
            <Button url={""} content="Palpacion" icono={<FaHeart />} />
            <Button url={""} content="Nacimientos" icono={<FaCow />} />
            <Button url={""} content="Produccion" icono={<FaPercent />} />
            <Button url={""} content="Ventas" icono={<FaChartLine />} />
          </div> */}
        </div>

        {/* Inicio de la fila numero 4 */}
        <div className="col-span-2 row-span-6 row-start-2 bg-gray-300 flex flex-col items-center justify-center">
          <div className="h-14 w-full flex items-center ml-7">
            <h2 className=" font-bold text-lg"> Titulo del menu</h2>
          </div>

          <div className="bg-slate-50 w-[90%] h-[95%]"></div>
        </div>
      </div>
    </>
  );
};

export default Layout;
