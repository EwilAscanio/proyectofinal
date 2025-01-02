import { conn } from "@/libs/mariadb";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const result = await conn.query("SELECT * FROM configuracion WHERE id=1");
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error al obtener la configuración:", error.message);
    return NextResponse.json(
      {
        message: error.message,
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

    let result;

    // Solo actualizar si se proporciona el número de factura
    if (numero_fac) {
      result = await conn.query(
        `UPDATE configuracion
         SET numero_fac = ?
         WHERE id = 1`,
        [numero_fac]
      );
    }

    // Solo actualizar si se proporciona la última vacunación
    if (ultima_vacunacion) {
      result = await conn.query(
        `UPDATE configuracion
         SET ultima_vacunacion = ?
         WHERE id = 1`,
        [ultima_vacunacion]
      );
    }

    // Comprobar si se actualizó algo
    if (result && result.affectedRows > 0) {
      // Verifica que haya filas afectadas
      return NextResponse.json(
        { message: "Los datos se actualizaron correctamente" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "No se realizaron actualizaciones." },
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

/* Comentario: Realizacion de la ruta PUT para actualizar la configuracion de la aplicacion
export const PUT = async (req) => {
  try {
    const data = await req.json();

    const { numero_fac, ultima_vacunacion } = data;

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
*/
