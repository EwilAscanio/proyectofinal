import Navbar from "@/components/Navbar";
import Navbar2 from "@/components/Navbar2";

export default function Layout({ children }) {
  return (
    <div className="h-screen grid grid-rows-[15vh,1fr] bg-slate-200">
      {/* <Navbar className="flex flex-col justify-between" /> */}
      <Navbar2 />
      <main>{children}</main>
    </div>
  );
}
