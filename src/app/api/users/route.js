import { conn } from "@/libs/mariadb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const result = await conn.query("SELECT * FROM users");
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error.message); // Agregar log para el error
    return NextResponse.json(
      {
        message: error.message, // Cambiar 'result.error' por 'error.message'
      },
      {
        status: 500,
      }
    );
  }
};
