import { conn } from "@/libs/mariadb";
import { NextResponse } from "next/server";

export const GET = async () => {
  /* Comentario: Realizacion de la consulta a la base de datos
  para traer todos los usuarios registrados.
  Se utiliza un try catch para evaluar si la solicitud fue realizada
  con exito permite la consulta a la base de datos de los contrario da un error con status 500.
*/
  try {
    const result = await conn.query("SELECT * FROM users");

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        message: result.error,
      },
      {
        status: 500,
      }
    );
  }
};

export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { message: "Email de usuario no proporcionado" },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();
    const { name_usr, login_usr, email_usr, password_usr, id_rol } = body;

    let query = `
      UPDATE users
      SET name_usr = ?, login_usr = ?, email_usr = ?, id_rol = ?
      WHERE email_usr = ?
    `;
    let params = [name_usr, login_usr, email_usr, id_rol, email];

    if (password_usr) {
      const hashedPassword = await bcrypt.hash(password_usr, 12);
      query = `
        UPDATE users
        SET name_usr = ?, login_usr = ?, email_usr = ?, password_usr = ?, id_rol = ?
        WHERE email_usr = ?
      `;
      params = [name_usr, login_usr, email_usr, hashedPassword, id_rol, email];
    }

    const [result] = await conn.execute(query, params);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Usuario actualizado exitosamente" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al actualizar el usuario" },
      { status: 500 }
    );
  }
}
