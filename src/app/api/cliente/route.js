import { conn } from "@/libs/mariadb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const result = await conn.query("SELECT * FROM clientes");

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: result.error || "Error al obtener los animales",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = async (req) => {
  try {
    const data = await req.json();

    const {
      codigo_cli,
      nombre_cli,
      telefono_cli,
      direccion_cli,
      rif_cli,
      email_cli,
    } = data;

    // Verificar si el cliente ya está registrado
    const existingClient = await conn.query(
      "SELECT * FROM clientes WHERE codigo_cli = ?",
      [codigo_cli]
    );

    if (existingClient.length > 0) {
      return NextResponse.json(
        {
          message: "El cliente ya está registrado.",
        },
        {
          status: 400,
        }
      );
    }

    const result = await conn.query("INSERT INTO clientes SET ?", {
      codigo_cli,
      nombre_cli,
      telefono_cli,
      direccion_cli,
      rif_cli,
      email_cli,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error en la API:", error); // Agrega esto
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
