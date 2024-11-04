"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (data) => {
    // Aquí iría la lógica para enviar el formulario
    console.log(data);
    setIsSubmitted(true);
    reset();
  };
  return (
    <>
      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-blue-800 mb-8 text-center">
          Contáctanos
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Formulario de contacto */}
          <div className="md:w-2/3">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Nombre
                </label>
                <input
                  {...register("name", { required: "Este campo es requerido" })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Tu nombre"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs italic">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "Este campo es requerido",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Dirección de email inválida",
                    },
                  })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs italic">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="message"
                >
                  Mensaje
                </label>
                <textarea
                  {...register("message", {
                    required: "Este campo es requerido",
                  })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                  id="message"
                  placeholder="Tu mensaje"
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-xs italic">
                    {errors.message.message}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                  type="submit"
                >
                  Enviar Mensaje
                </button>
              </div>
            </form>
            {isSubmitted && (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">¡Gracias! </strong>
                <span className="block sm:inline">
                  Hemos recibido tu mensaje. Nos pondremos en contacto contigo
                  pronto.
                </span>
              </div>
            )}
          </div>

          {/* Información de contacto */}
          <div className="md:w-1/3">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">
                Información de Contacto
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="text-blue-600 mr-2" />
                  <p>123 Calle Principal, Ciudad, País</p>
                </div>
                <div className="flex items-center">
                  <Phone className="text-blue-600 mr-2" />
                  <p>(123) 456-7890</p>
                </div>
                <div className="flex items-center">
                  <Mail className="text-blue-600 mr-2" />
                  <p>info@ganaderiaXYZ.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
