import { NextResponse } from "next/server";
import { conn } from "@/libs/mariadb";

export const POST = async (req) => {
  try {
    console.log("Intentando registrar la producción de leche...", req);
    const { codigo_ani, litros_lec, fecha_lec } = await req.json();
    console.log("Código del animal:", codigo_ani, "Litros:", litros_lec);

    // Validar que se haya proporcionado el código del animal, litros y fecha
    if (!codigo_ani || !litros_lec || !fecha_lec) {
      return NextResponse.json(
        { message: "Los datos son requeridos." },
        { status: 400 }
      );
    }

    // Insertar la producción de leche
    const result = await conn.query(
      `INSERT INTO produccionleche (codigo_ani, litros_lec, fecha_lec) VALUES (?, ?, ?)`,
      [codigo_ani, litros_lec, fecha_lec]
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error al registrar:", error.message);
    return NextResponse.json(
      { message: "Ocurrió un error al registrar la producción de leche." },
      { status: 500 }
    );
  }
};
