"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  LuUser,
  LuShoppingCart,
  LuDollarSign,
  LuArrowRight,
} from "react-icons/lu";
import Link from "next/link";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const RegisterInvoice = () => {
  const router = useRouter();
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [precioProducto, setPrecioProducto] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  useEffect(() => {
    // Cargar clientes y productos desde la API
    const fetchData = async () => {
      try {
        const clientesRes = await axios.get(
          "http://localhost:3000/api/clientes"
        );
        const productosRes = await axios.get(
          "http://localhost:3000/api/productos"
        );
        setClientes(clientesRes.data);
        setProductos(productosRes.data);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    fetchData();
  }, []);

  // Actualizar el precio del producto cuando se selecciona uno
  const productoSeleccionado = watch("producto_id");
  useEffect(() => {
    const producto = productos.find((p) => p.id === productoSeleccionado);
    setPrecioProducto(producto ? producto.precio : 0);
  }, [productoSeleccionado, productos]);

  // Función para manejar el envío del formulario
  const onSubmit = handleSubmit(async (data) => {
    const total = precioProducto * data.cantidad;
    try {
      const res = await axios.post(
        "http://localhost:3000/api/registerinvoice",
        { ...data, total }
      );

      if (res.status === 200) {
        Swal.fire({
          title: "Registrar Factura",
          text: "La factura ha sido registrada exitosamente.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        router.push("/facturas"); // Redirige a la página de facturas
      } else {
        alert("Ocurrió un error al registrar la factura. Intenta nuevamente.");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error en la solicitud.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  });

  return (
    <div className="mt-20 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Registrar Factura
          </h1>
          <p className="text-gray-600 mt-2">Rellene los datos correctamente</p>
        </div>
        <form className="space-y-4" onSubmit={onSubmit}>
          {/* Campo de selección de Cliente */}
          <div className="relative">
            <LuUser
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("cliente_id", { required: "Campo requerido" })}
            >
              <option value="">Seleccionar Cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.name}
                </option>
              ))}
            </select>
            {errors.cliente_id && (
              <span className="text-red-600 text-sm">
                {errors.cliente_id.message}
              </span>
            )}
          </div>

          {/* Campo de selección de Producto */}
          <div className="relative">
            <LuShoppingCart
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("producto_id", { required: "Campo requerido" })}
            >
              <option value="">Seleccionar Producto</option>
              {productos.map((producto) => (
                <option key={producto.id} value={producto.id}>
                  {producto.nombre} - ${producto.precio}
                </option>
              ))}
            </select>
            {errors.producto_id && (
              <span className="text-red-600 text-sm">
                {errors.producto_id.message}
              </span>
            )}
          </div>

          {/* Campo de Cantidad */}
          <div className="relative">
            <LuDollarSign
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="number"
              placeholder="Cantidad"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("cantidad", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
                min: {
                  value: 1,
                  message: "La cantidad debe ser al menos 1",
                },
              })}
            />
            {errors.cantidad && (
              <span className="text-red-600 text-sm">
                {errors.cantidad.message}
              </span>
            )}
          </div>

          {/* Mostrar Total */}
          <div className="text-lg font-bold">
            Total: ${precioProducto * (watch("cantidad") || 0)}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center mt-6"
          >
            Crear Factura
            <LuArrowRight className="ml-2" size={20} />
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes una factura?{" "}
            <Link href="/facturas" className="text-blue-600 hover:underline">
              Ver Facturas
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterInvoice;
