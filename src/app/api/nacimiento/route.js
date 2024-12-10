import { NextResponse } from "next/server";
import { conn } from "@/libs/mariadb";

export const POST = async (req) => {
  try {
    const { codigo_ani, fecha_nac, cantidadHijos_nac } = await req.json();

    // Validar que se haya proporcionado el código del animal, litros y fecha
    if (!codigo_ani || !fecha_nac || !cantidadHijos_nac) {
      return NextResponse.json(
        { message: "Los datos son requeridos." },
        { status: 400 }
      );
    }

    // Insertar el proceso de Nacimiento en la base de datos
    const result = await conn.query(
      `INSERT INTO nacimiento (codigo_ani, fecha_nac, cantidadHijos_nac) VALUES (?, ?, ?)`,
      [codigo_ani, fecha_nac, cantidadHijos_nac]
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error al registrar:", error.message);
    return NextResponse.json(
      { message: "Ocurrió un error al registrar el proceso de palpacion." },
      { status: 500 }
    );
  }
};
