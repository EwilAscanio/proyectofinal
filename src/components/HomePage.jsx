import Image from "next/image";
import Link from "next/link";
import ImageHome from "@/images/imagen1.jpg";
import Footer from "@/components/Footer";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Contenedor de fondo con imagen y overlay */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={ImageHome}
          alt="Fondo"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Contenido de la página */}
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="relative">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-white text-2xl font-bold">
                Logo
              </Link>
              <ul className="flex space-x-4">
                <li>
                  <Link
                    href="/"
                    className="text-white hover:text-blue-500 hover:underline cursor-pointer"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-white hover:text-blue-500 hover:underline cursor-pointer"
                  >
                    Acerca de
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-white hover:text-blue-500 hover:underline cursor-pointer"
                  >
                    Servicios
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-white hover:text-blue-500 hover:underline cursor-pointer"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Contenido principal */}
        <main className="flex-grow flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Bienvenido a Ganaderia "Los Chorrerones"
          </h1>
          <p className="text-xl mb-8">
            Cuidado de animales y producción láctea de calidad
          </p>

          <div className="space-x-4">
            <Link
              href="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Iniciar Sesión
            </Link>

            <Link
              href="/register"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Registrar
            </Link>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
