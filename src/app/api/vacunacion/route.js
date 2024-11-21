import { NextResponse } from "next/server";
import { conn } from "@/libs/mariadb";

/*
export const PUT = async (req) => {
  try {
    const { vaccinationDate } = await req.json();

    // Actualizar la fecha de vacunación para todos los animales
    const result = await conn.query("UPDATE animals SET fechavacunacion = ?", [
      vaccinationDate,
    ]);

    return NextResponse.json(result);
  } catch (error) {
    console.error(
      "Error al actualizar:",
      error.response ? error.response.data : error.message
    );
    Swal.fire({
      title: "Error",
      text: "Ocurrió un error al actualizar la fecha de vacunación.",
      icon: "error",
      confirmButtonColor: "#d33",
    });
  }
};*/

export const PUT = async (req) => {
  try {
    console.log("Intentando actualizar fecha de vacunaciónREQ...", req);
    const fecha = await req.json();
    console.log(
      "Intentando actualizar fecha de vacunaciónFECGA...",
      fecha.fechaVacunacion_ani
    );

    // Validar que se haya proporcionado una fecha de vacunación
    if (!fecha.fechaVacunacion_ani) {
      return NextResponse.json(
        { message: "La fecha de vacunación es requerida." },
        { status: 400 }
      );
    }

    // Actualizar la fecha de vacunación para todos los animales
    const result = await conn.query(
      `UPDATE animal SET fechaVacunacion_ani = "${fecha.fechaVacunacion_ani}"`
    );

    // Verificar si se actualizó algún registro
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "No se encontraron registros para actualizar." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Fecha de vacunación actualizada correctamente." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al actualizar:", error.message);
    return NextResponse.json(
      { message: "Ocurrió un error al actualizar la fecha de vacunación." },
      { status: 500 }
    );
  }
};