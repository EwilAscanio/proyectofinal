import { conn } from "@/libs/mariadb";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const result = await conn.query("SELECT * FROM configuracion WHERE id=1");

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        message: result.error,
      },
      {
        status: 500,
      }
    );
  }
};

export const PUT = async (req) => {
  try {
    const data = await req.json();

    const { numero_fac, ultima_vacunacion } = data;

    console.log("DATA", data);

    if (!numero_fac) {
      const result = await conn.query(
        `UPDATE configuracion
                SET ultima_vacunacion = ?
                WHERE id = 1`,
        [ultima_vacunacion]
      );
    }

    if (!ultima_vacunacion) {
      const result = await conn.query(
        `UPDATE configuracion
                SET numero_fac = ? 
                WHERE id = 1`,
        [numero_fac]
      );
    }

    return NextResponse.json(
      { message: "El numero de factura se actualizó correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al actualizar:", error.message);
    return NextResponse.json(
      { message: "Ocurrió un error al actualizar el peso." },
      { status: 500 }
    );
  }
};

/* Verificar Luego
export const PUT = async (req) => {
  try {
    const data = await req.json();
    const { numero_fac, ultima_vacunacion } = data;

    console.log("DATA", data);

    // Variable para verificar si se realizó alguna actualización
    let updated = false;

    if (numero_fac !== undefined) {
      await conn.query(
        `UPDATE configuracion
         SET numero_fac = ?
         WHERE id = 1`,
        [numero_fac]
      );
      updated = true; // Marcar que se actualizó
    }

    if (ultima_vacunacion !== undefined) {
      await conn.query(
        `UPDATE configuracion
         SET ultima_vacunacion = ?
         WHERE id = 1`,
        [ultima_vacunacion]
      );
      updated = true; // Marcar que se actualizó
    }
    console.log("FACTURA", numero_fac);
    console.log("ULTIMA VAC", ultima_vacunacion);
    console.log("UPDATED", updated);
    if (updated) {
      return NextResponse.json(
        { message: "La configuración se actualizó correctamente" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "No se proporcionaron datos para actualizar." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error al actualizar:", error.message);
    return NextResponse.json(
      { message: "Ocurrió un error al actualizar la configuración." },
      { status: 500 }
    );
  }
};
*/
