import { conn } from "@/libs/mariadb";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const result = await conn.query(`
          SELECT * FROM clientes WHERE codigo_cli = "${params.id}"`);

    if (result.lenght === 0 || result == []) {
      return NextResponse(
        {
          message: "Cliente no encontrado",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
};

export const PUT = async (req, { params }) => {
  try {
    const {
      codigo_cli,
      nombre_cli,
      telefono_cli,
      rif_cli,
      email_cli,
      direccion_cli,
    } = await req.json();

    const result = await conn.query(
      `
        UPDATE clientes
        SET codigo_cli = "${codigo_cli}", nombre_cli = "${nombre_cli}", telefono_cli = "${telefono_cli}", direccion_cli = "${direccion_cli}", rif_cli = "${rif_cli}", email_cli = "${email_cli}"
        WHERE codigo_cli = "${params.id}"
      `
    );

    return NextResponse.json(result);
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
  const result = await conn.query(
    `DELETE FROM clientes WHERE codigo_cli = "${params.id}"`
  );
  try {
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
    return NextResponse(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
};
