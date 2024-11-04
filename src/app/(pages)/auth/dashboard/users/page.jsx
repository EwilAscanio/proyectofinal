import axios from "axios";
import Link from "next/link";
import ImagenProfile from "@/images/8380015.jpg";
import Image from "next/image";

const loadUsers = async () => {
  const { data } = await axios.get("http://localhost:3000/api/users");

  console.log("DATA RECIBIDA GET", data);
  return data;
};

const UsersPage = async () => {
  const users = await loadUsers();

  console.log("USUARIOS RECIBIDOS", users);

  return (
    <div className="w-full flex justify-center items-center flex-wrap gap-8">
      {users.map((user) => (
        // <Link
        //   href={`/auth/dashboard/users/${user.id_usr}`}
        //   className="w-60 p-2 bg-white rounded-xl"
        // >
        //   <h5>Nombre: {user.name_usr}</h5>
        //   <span>Email: {user.email_usr}</span>
        //   <div>Login: {user.login_usr}</div>
        //   <span>Rol: {user.id_rol}</span>
        // </Link>
        <Link href={`/auth/dashboard/users/${user.id_usr}`}>
          <section className="flex font-medium items-center justify-center hover:bg-blue-100 hover:rounded-2xl ">
            <section className="w-80 mx-auto rounded-2xl px-8 py-6 shadow-lg">
              <div className="flex items-center justify-between"></div>
              <div className="mt-6 w-fit mx-auto">
                <Image
                  src={ImagenProfile}
                  className="rounded-full w-28 shadow-sm "
                  alt="profile picture"
                />
              </div>

              <div className="mt-8 ">
                <h4 className="text-blue-600 font-bold text-2xl tracking-wide">
                  {user.name_usr} <br /> {user.login_usr}
                </h4>
              </div>
              <p class="text-blue-400 font-semibold mt-2.5">{user.email_usr}</p>
            </section>
          </section>
        </Link>
      ))}
    </div>
  );
};

export default UsersPage;
