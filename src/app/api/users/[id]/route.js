import { NextResponse } from "next/server";
import { conn } from "@/libs/mariadb";
import bcrypt from "bcrypt";

export const GET = async (req, { params }) => {
  console.log("Params GET:", params);
  try {
    console.log("Parámetros recibidos:", params);

    const result = await conn.query(`
          SELECT * FROM users INNER JOIN roles ON users.id_rol = roles.id_rol
          WHERE email_usr = "${params.id}"`);

    console.log("Result", result);

    if (result.lenght === 0 || result == []) {
      return NextResponse(
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

// export const PUT = async (req, { params }) => {
//   console.log("Params PUT:", params);

//   // Validar que los datos necesarios estén en el cuerpo de la solicitud
//   if (
//     !req.body ||
//     !req.body.name_usr ||
//     !req.body.login_usr ||
//     !req.body.email_usr ||
//     !req.body.password_usr ||
//     !req.body.id_rol
//   ) {
//     return NextResponse.json(
//       {
//         message: "Solicitud inválida. Faltan datos del usuario.",
//       },
//       {
//         status: 400, // Bad Request
//       }
//     );
//   }

//   // Construir la consulta SQL con prepared statements para prevenir inyecciones
//   const query = `
//     UPDATE users
//     SET name_usr = ?, login_usr = ?, email_usr = ?, password_usr = ?, id_rol = ?
//     WHERE id_usr = ?
//   `;

//   try {
//     // Asumiendo que estás usando bcrypt para hashear contraseñas
//     const hashedPassword = await bcrypt.hash(req.body.password_usr, 12);

//     const result = await conn.query(query, [
//       req.body.name_usr,
//       req.body.login_usr,
//       req.body.email_usr,
//       hashedPassword, // Contraseña hasheada
//       req.body.id_rol,
//       params.id,
//     ]);

//     if (result.affectedRows === 0) {
//       return NextResponse.json(
//         {
//           message: "Usuario no encontrado",
//         },
//         {
//           status: 404,
//         }
//       );
//     }

//     return NextResponse.json("Usuario actualizado exitosamente");
//   } catch (error) {
//     console.error(error);
//     return NextResponse(
//       {
//         message: "Error al actualizar el usuario",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// };

export const DELETE = async (req, { params }) => {
  console.log("Params DELETE:", params);

  const result = await conn.query(`
          DELETE FROM users WHERE id_usr = "${params.id}"`);
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

    return NextResponse.json("Usuario eliminado exitosamente");
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

// export const PUT = async (req, { params }) => {
//   console.log("Params PUT:", params);

//   try {
//     const body = await req.json();

//     // Validar que los datos necesarios estén en el cuerpo de la solicitud
//     const requiredFields = [
//       "name_usr",
//       "login_usr",
//       "email_usr",
//       "password_usr",
//       "id_rol",
//     ];
//     for (const field of requiredFields) {
//       if (!(field in body)) {
//         return NextResponse.json(
//           { message: `Solicitud inválida. Falta el campo ${field}.` },
//           { status: 400 }
//         );
//       }
//     }

//     // Construir la consulta SQL con prepared statements para prevenir inyecciones
//     const query = `
//       UPDATE users
//       SET name_usr = ?, login_usr = ?, email_usr = ?, password_usr = ?, id_rol = ?
//       WHERE id_usr = ?
//     `;

//     // Hashear la contraseña
//     const hashedPassword = await bcrypt.hash(body.password_usr, 12);

//     const [result] = await conn.execute(query, [
//       body.name_usr,
//       body.login_usr,
//       body.email_usr,
//       hashedPassword,
//       body.id_rol,
//       params.id,
//     ]);

//     if (result.affectedRows === 0) {
//       return NextResponse.json(
//         { message: "Usuario no encontrado" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { message: "Usuario actualizado exitosamente" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "Error al actualizar el usuario" },
//       { status: 500 }
//     );
//   }
// };

// export async function PUT(req) {
//   const { searchParams } = new URL(req.url);
//   const email = searchParams.get("email");

//   if (!email) {
//     return NextResponse.json(
//       { message: "Email de usuario no proporcionado" },
//       { status: 400 }
//     );
//   }

//   try {
//     const body = await req.json();
//     const { name_usr, login_usr, email_usr, password_usr, id_rol } = body;

//     let query = `
//       UPDATE users
//       SET name_usr = ?, login_usr = ?, email_usr = ?, id_rol = ?
//       WHERE email_usr = ?
//     `;
//     let params = [name_usr, login_usr, email_usr, id_rol, email];

//     if (password_usr) {
//       const hashedPassword = await bcrypt.hash(password_usr, 12);
//       query = `
//         UPDATE users
//         SET name_usr = ?, login_usr = ?, email_usr = ?, password_usr = ?, id_rol = ?
//         WHERE email_usr = ?
//       `;
//       params = [name_usr, login_usr, email_usr, hashedPassword, id_rol, email];
//     }

//     const [result] = await conn.execute(query, params);

//     if (result.affectedRows === 0) {
//       return NextResponse.json(
//         { message: "Usuario no encontrado" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ message: "Usuario actualizado exitosamente" });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "Error al actualizar el usuario" },
//       { status: 500 }
//     );
//   }
// }
