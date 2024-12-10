import { conn } from "@/libs/mariadb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const result = await conn.query("SELECT * FROM animal");

    // Consulta para obtener el conteo total de animales
    const [countResult] = await conn.query(
      "SELECT COUNT(*) AS cantidad FROM animal"
    );

    // Verifica que countResult tenga resultados
    if (!countResult || countResult.length === 0) {
      throw new Error("No se pudo obtener el conteo de animales.");
    }

    // Obtiene el valor de cantidad de animales
    const cantidadAnimales = countResult.cantidad;

    return NextResponse.json(
      { infoAnimales: result, total: cantidadAnimales },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message || "Error al obtener los animales",
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
      codigo_ani,
      nombre_ani,
      chip_ani,
      id_gru,
      id_fam,
      sexo_ani,
      fechaPalpacion_ani,
      tiempoGestacion_ani,
      peso_ani,
      arete_ani,
      fechaNacimiento_ani,
      fechaVacunacion_ani,
      status_ani,
      precio_ani,
    } = data;

    const result = await conn.query("INSERT INTO animal set ?", {
      codigo_ani,
      nombre_ani,
      chip_ani,
      id_gru,
      id_fam,
      sexo_ani,
      fechaPalpacion_ani,
      tiempoGestacion_ani,
      peso_ani,
      arete_ani,
      fechaNacimiento_ani,
      fechaVacunacion_ani,
      status_ani,
      precio_ani,
    });

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
