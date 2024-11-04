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

const Sidebar = async () => {
  return (
    <>
      <div className="flex flex-col gap-1 items-center">
        <h2 className="font-bold underline text-blue-800 drop-shadow-lg text-lg">
          Menu Principal
        </h2>
        <Button
          url={"/dashboard"}
          content="Dashboard"
          icono={<MdDashboardCustomize />}
        />
        <Button url={"/"} content="Ficha Animal" icono={<FaHorseHead />} />

        <Button
          url={"/auth/dashboard/updateusers"}
          content="Act Usuarios"
          icono={<FaUsers />}
        />

        <Button url={""} content="Eliminar Usuarios" icono={<FaUserShield />} />
        <Button
          url={"/auth/dashboard/users"}
          content="Usuarios"
          icono={<TbReportAnalytics />}
        />
      </div>

      <div className="flex flex-col gap-3 items-center">
        <h2 className="mt-4 font-bold underline text-blue-800 drop-shadow-lg text-lg">
          Procesos
        </h2>
        <Button url={""} content="Vacunacion" icono={<FaBriefcaseMedical />} />
        <Button url={""} content="Pesaje" icono={<FaWeightScale />} />
        <Button url={""} content="Palpacion" icono={<FaHeart />} />
        <Button url={""} content="Nacimientos" icono={<FaCow />} />
        <Button url={""} content="Produccion" icono={<FaPercent />} />
        <Button url={""} content="Ventas" icono={<FaChartLine />} />
      </div>
    </>
  );
};

export default Sidebar;
