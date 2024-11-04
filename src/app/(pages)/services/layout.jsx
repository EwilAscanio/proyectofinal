import Navbar from "@/components/Navbar";
import Navbar2 from "@/components/Navbar2";

export default function Layout({ children }) {
  return (
    <div className="h-screen grid grid-rows-[15vh,1fr] bg-gradient-to-br from-blue-500 to-purple-600">
      <Navbar2 />
      <main>{children}</main>
    </div>
  );
}
