import { conn } from "@/libs/mariadb";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  try {
    const { status_ani } = await req.json();

    // Verificar si se proporcionó status_ani y params.id
    if (!status_ani || !params.id) {
      return NextResponse.json(
        { message: "Faltan datos necesarios para la actualización." },
        { status: 400 }
      );
    }

    // Actualizar el status del animal en la base de datos
    const result = await conn.query(
      `
        UPDATE animal
        SET 
          status_ani = ?
        WHERE codigo_ani = ?
      `,
      [status_ani, params.id]
    );

    // Verificar si se actualizó algún registro
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "No se encontró el animal para actualizar." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Animal actualizado exitosamente." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error en la actualización: " + error.message,
      },
      {
        status: 500,
      }
    );
  }
};
