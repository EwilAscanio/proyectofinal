import { conn } from "@/libs/mariadb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const data = await req.json();

    const { numero_fac, codigo_cli, observaciones_fac, animales } = data;
    console.log("DATA FACTURA", data);

    // Validar que los datos necesarios estén presentes
    if (
      !numero_fac ||
      !codigo_cli ||
      !observaciones_fac ||
      !animales ||
      !Array.isArray(animales)
    ) {
      return NextResponse.json(
        {
          message:
            "Datos incompletos. Asegúrate de enviar todos los campos requeridos.",
        },
        {
          status: 400,
        }
      );
    }

    // Calcular el total de la factura
    let totalFactura = 0;
    for (const animal of animales) {
      totalFactura += animal.precio;
    }

    // Insertar la factura en la base de datos
    const factura = {
      numero_fac,
      codigo_cli,
      fecha_fac: new Date().toISOString().slice(0, 10), // Formato 'YYYY-MM-DD'
      total_fac: totalFactura,
      observaciones_fac,
    };

    const result = await conn.query("INSERT INTO factura SET ?", factura);

    // Insertar los animales relacionados con la factura
    for (const animal of animales) {
      const detalle = {
        numero_fac: numero_fac, // ID de la factura
        codigo_ani: animal.codigo_ani,
        cantidad_fac: 1,
        precio_fac: animal.precio_ani,
        total_fac: 1 * animal.precio_ani, // Total por animal
      };

      await conn.query("INSERT INTO detalle_factura SET ?", detalle);
    }

    return NextResponse.json(
      {
        message: "Factura registrada correctamente.",
        numero_fac: numero_fac,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error en la API:", error);
    return NextResponse.json(
      {
        message: "Error interno del servidor.",
      },
      {
        status: 500,
      }
    );
  }
};
