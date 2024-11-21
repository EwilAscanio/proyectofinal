import { conn } from "@/libs/mariadb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const data = await req.json();
    console.log("DATA FACTURA", data);

    const { numero_fac, codigo_cli, observaciones_fac, animales } = data;

    console.log("DATA FACTURA2", data);

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
      if (
        !animal.codigo_ani ||
        !animal.cantidad_fac ||
        animal.precio_fac == null
      ) {
        return NextResponse.json(
          {
            message: "Datos de animales incompletos.",
          },
          {
            status: 400,
          }
        );
      }
      totalFactura += animal.cantidad_fac * animal.precio_fac; // Calcular el total de la factura
    }

    // Iniciar transacción
    await conn.beginTransaction();

    try {
      // Insertar la factura en la base de datos
      const factura = {
        numero_fac,
        codigo_cli,
        fecha_fac: new Date(), // Asegúrate de que este formato sea correcto para tu base de datos
        total_fac: totalFactura,
        observaciones_fac,
      };
      console.log("DATA FACTURA", factura);
      const result = await conn.query("INSERT INTO factura SET ?", factura);
      const numero_fac = result.insertId; // Obtener el ID de la factura recién creada

      console.log("RESULT", result);
      console.log("NUMERO FAC", numero_fac);

      // Insertar los animales relacionados con la factura
      for (const animal of animales) {
        const detalle = {
          numero_fac, // ID de la factura
          codigo_ani: animal.codigo_ani,
          cantidad_fac: animal.cantidad_fac,
          precio_fac: animal.precio_fac,
          total_fac: animal.cantidad_fac * animal.precio_fac, // Total por animal
        };

        await conn.query("INSERT INTO detalle_factura SET ?", detalle);
      }

      // Confirmar la transacción
      await conn.commit();

      return NextResponse.json(
        {
          message: "Factura registrada correctamente.",
          numero_fac,
        },
        {
          status: 201,
        }
      );
    } catch (error) {
      await conn.rollback(); // Revertir la transacción en caso de error
      console.error("Error al registrar la factura:", error);
      return NextResponse.json(
        {
          message: "Error al registrar la factura.",
        },
        {
          status: 500,
        }
      );
    }
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
