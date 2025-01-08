import { NextResponse } from "next/server";
import { conn } from "@/libs/mariadb";

export const GET = async (req, { params }) => {
  try {
    const result = await conn.query(
      `
          SELECT * FROM users INNER JOIN roles ON users.id_rol = roles.id_rol
          WHERE email_usr = ?`,
      [params.id]
    ); // Uso de parámetros

    if (result.length === 0) {
      // Corrección de 'length'
      return NextResponse.json(
        {
          message: "Usuario no encontrado",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(result[0]);
  } catch (error) {
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

export const DELETE = async (req, { params }) => {
  try {
    const result = await conn.query(
      `
          DELETE FROM users WHERE id_usr = ?`,
      [params.id]
    ); // Uso de parámetros

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Usuario no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Usuario eliminado exitosamente",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
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
