"use client";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import ImagenProfile from "@/images/8380015.jpg";
import ButtonUpdate from "@/components/ButtonUpdate";
import { useRouter } from "next/navigation";

const loadUser = async (user_id) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/usersdelete/${user_id}`
  );
  console.log("Data recibida de funcion loadUser NEwWS:", data);
  return data;
};

const UpdatePage = ({ params }) => {
  const userId = params.user_id; // Obtener el ID del usuario de los parámetros de la URL
  const [userData, setUserData] = useState({
    name_usr: "",
    login_usr: "",
    email_usr: "",
    password_usr: "",
    id_rol: "",
  });

  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/usersdelete/${userId}`);
        setUserData(response.data);
        console.log("RESPONSE GET", response.data);
      } catch (error) {
        console.error(error);
        // Manejar el error (opcional: redirigir a página de error)
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]); // Dependencia del userId
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/usersdelete/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el usuario");
      }

      // Manejar la respuesta exitosa
      console.log("Usuario actualizado exitosamente");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name_usr"
            value={userData.name_usr}
            onChange={handleChange}
          />
        </label>
        <label>
          Login:
          <input
            type="text"
            name="login_usr"
            value={userData.login_usr}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email_usr"
            value={userData.email_usr}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="text"
            name="password_usr"
            value={userData.password_usr}
            onChange={handleChange}
          />
        </label>

        <label>
          Select Rol:
          <select
            type="text"
            name="id_rol"
            value={userData.id_rol}
            onChange={handleChange}
          />
        </label>

        <select>
          <option value="{userData.id_rol}" onChange={handleChange}>
            Rol de Usuario
          </option>
          <option value="2">Usuario</option>
          <option value="1">Administrador</option>
        </select>
        {/* Resto de los campos del formulario */}
        <button type="submit">Actualizar</button>
        <ButtonUpdate content={"Delete"} user_id={params.id} />
      </form>
    </>
  );
};

export default UpdatePage;
