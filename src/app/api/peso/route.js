import { NextResponse } from "next/server";
import { conn } from "@/libs/mariadb";

export const PUT = async (req) => {
  try {
    const { codigo_ani, peso_ani } = await req.json();

    // Validar que se haya proporcionado el peso y el código del animal
    if (!codigo_ani || !peso_ani) {
      return NextResponse.json(
        { message: "El código del animal y el peso son requeridos." },
        { status: 400 }
      );
    }

    // Verificar si el animal existe antes de actualizar
    const animalExists = await conn.query(
      `SELECT * FROM animal WHERE codigo_ani = ?`,
      [codigo_ani]
    );

    if (animalExists.length === 0) {
      return NextResponse.json(
        { message: "Animal no encontrado." },
        { status: 404 }
      );
    }

    // Actualizar el peso del animal específico
    const result = await conn.query(
      `UPDATE animal SET peso_ani = ? WHERE codigo_ani = ?`,
      [peso_ani, codigo_ani]
    );

    // Verificar si se actualizó algún registro
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "No se encontraron registros para actualizar." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "El peso se actualizó correctamente." },
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
