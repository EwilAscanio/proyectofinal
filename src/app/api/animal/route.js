import { conn } from "@/libs/mariadb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const result = await conn.query("SELECT * FROM animal");

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
    console.log(data);
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

    console.log("DATA", data);

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

    console.log(result);

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
