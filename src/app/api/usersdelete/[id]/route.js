import { NextResponse } from "next/server";
import { conn } from "@/libs/mariadb";

export const GET = async (req, { params }) => {
  console.log("Params GET DELETE:", params);
  try {
    console.log("Parámetros recibidos get delete:", params);

    const result = await conn.query(`
          SELECT * FROM users WHERE id_usr = "${params.id}"`);

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

export const DELETE = async (req, { params }) => {
  console.log("Params DELETE:", params);

  const result = await conn.query(
    `DELETE FROM users WHERE id_usr = "${params.id}"`
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

export const PUT = async (req, { params }) => {
  console.log("PARAMS PUT:", params);
  console.log("REQ PUT:", req);

  try {
    /*const result = await conn.query(
      `
    UPDATE users
    SET name_usr = ${name_usr}, login_usr = ${login_usr}, email_usr = ${email_usr}, password_usr = ${password_usr}, id_rol = ${id_rol}
    WHERE id_usr = ${params.id}
  `
    );
    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Usuario no encontrado",
        },
        {
          status: 404,
        }
      );
    }*/

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

//   const result = await conn.query(
// `INSERT INTO users SET(name_usr, login_usr, email_usr, password_usr, id_rol) values() WHERE id_usr = "${params.id}"`
//   );
//   try {
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

//     return NextResponse.json("Usuario eliminado exitosamente");
//   } catch (error) {
//     return NextResponse(
//       {
//         message: error.message,
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// };
/*
export const PUT = async (req, res) => {
  console.log("Query PUT REQ:", req);
  console.log("Query PUT RES:", res);
  // console.log("Params PUT:", params);

  const userId = req.query.id_usr; // Obtén el ID del usuario de la consulta de la URL

  // Validar que los datos necesarios estén en el cuerpo de la solicitud
  if (
    !req.body ||
    !req.body.name_usr ||
    !req.body.login_usr ||
    !req.body.email_usr ||
    !req.body.password_usr ||
    !req.body.id_rol
  ) {
    return NextResponse.json(
      {
        message: "Solicitud inválida. Faltan datos del usuario.",
      },
      {
        status: 400, // Bad Request
      }
    );
  }

  // Construir la consulta SQL con prepared statements para prevenir inyecciones
  const query = `
    UPDATE users
    SET name_usr = ${name_usr}, login_usr = ?, email_usr = ?, password_usr = ?, id_rol = ?
    WHERE id_usr = ?
  `;

  try {
    // Asumiendo que estás usando bcrypt para hashear contraseñas
    const hashedPassword = await bcrypt.hash(req.body.password_usr, 10);

    const result = await conn.query(query, [
      req.body.name_usr,
      req.body.login_usr,
      req.body.email_usr,
      hashedPassword, // Contraseña hasheada
      req.body.id_rol,
      params.id,
    ]);

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

    return NextResponse.json("Usuario actualizado exitosamente");
  } catch (error) {
    console.error(error);
    return NextResponse(
      {
        message: "Error al actualizar el usuario",
      },
      {
        status: 500,
      }
    );
  }
};*/
