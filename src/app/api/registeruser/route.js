import { conn } from "@/libs/mariadb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req) => {
  try {
    const data = await req.json();
    console.log(data);
    let { name_usr, login_usr, email_usr, password_usr, id_rol } = data;

    password_usr = await bcrypt.hash(password_usr, 5);

    console.log(name_usr, login_usr, email_usr, password_usr, id_rol);

    const result = await conn.query("INSERT INTO users set ?", {
      name_usr,
      login_usr,
      email_usr,
      password_usr,
      id_rol,
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
