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

// export const PUT = async (req, { params }) => {
//   console.log("PARAMS PUT:", params);
//   console.log("REQ PUT:", req);

//   try {
//     /*const result = await conn.query(
//       `
//     UPDATE users
//     SET name_usr = ${name_usr}, login_usr = ${login_usr}, email_usr = ${email_usr}, password_usr = ${password_usr}, id_rol = ${id_rol}
//     WHERE id_usr = ${params.id}
//   `
//     );
//     if (result.affectedRows === 0) {
//       return NextResponse.json(
//         {
//           message: "Usuario no encontrado",
//         },
//         {
//           status: 404,
//         }
//       );
//     }*/

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
