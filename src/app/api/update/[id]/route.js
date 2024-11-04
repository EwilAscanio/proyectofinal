import { conn } from "@/libs/mariadb";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();
    const { nombre, email } = data;

    // Validación básica
    if (!nombre || !email) {
      return Response.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Actualizar usuario en la base de datos
    const query =
      "UPDATE users SET name_usr = ?, email_usr = ? WHERE id_usr = ?";
    await conn.query(query, [nombre, email, id]);

    return Response.json({ mensaje: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    return Response.json(
      { error: "Error al actualizar usuario" },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const query = "SELECT * FROM users WHERE id_usr = ?";
    const [rows] = await conn.query(query, [id]);

    if (rows.length === 0) {
      return Response.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    return Response.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return Response.json(
      { error: "Error al obtener usuario" },
      { status: 500 }
    );
  }
}
