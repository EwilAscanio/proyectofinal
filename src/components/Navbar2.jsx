"use client";
import Link from "next/link";
import { useState } from "react";

const Navbar2 = () => {
  const [isClick, setisClick] = useState(false);
  const toogleNavbar = () => {
    setisClick(!isClick);
  };
  return (
    <div>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 right-0 z-20 bg-blue-700 min-h-20 ">
        <div className="container mx-auto px-4 py-4 justify-between flex">
          <Link href="/" className="text-white text-2xl font-bold">
            Logo
          </Link>
          <div className="hidden md:block justify-between">
            <div className="flex items-center justify-between">
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

          <button
            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white md:hidden"
            onClick={toogleNavbar}
          >
            {isClick ? (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
        {isClick && (
          <div className="md:hidden">
            <div className="flex items-center justify-center">
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
        )}
      </nav>
    </div>
  );
};

export default Navbar2;
