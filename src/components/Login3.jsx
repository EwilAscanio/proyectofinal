import React from "react";
import { LuUser, LuLock, LuArrowRight, LuUserCircle } from "react-icons/lu";

const Login3 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Please sign in to your account</p>
        </div>
        <form className="space-y-6">
          {/* Campo numero 2 del Formulario LOGIN*/}
          <div className="relative">
            <LuUserCircle
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Login"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("login_usr", {
                required: {
                  value: true,
                  message: "campo requerido",
                },
                minLength: {
                  value: 2,
                  message: "El nombre debe terner minimo 2 caracteres",
                },
              })}
            />
            {/* Manejo de Errores */}
            {errors.name && (
              <span className="text-red-600 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="relative">
            <LuUser
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Username"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <LuLock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="button"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
          >
            Sign In
            <LuArrowRight className="ml-2" size={20} />
          </button>
        </form>
        <div className="mt-6 flex justify-between items-center">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </a>
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Create an account
          </a>
        </div>
        {/* <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">Or sign in with</p>
          <div className="mt-4 flex justify-center space-x-4">
            <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition duration-300">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
              </svg>
            </button>
            <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition duration-300">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.998,12c0-6.628-5.372-12-11.999-12C5.372,0,0,5.372,0,12c0,5.988,4.388,10.952,10.124,11.852v-8.384H7.078v-3.469h3.046V9.356c0-3.008,1.792-4.669,4.532-4.669c1.313,0,2.686,0.234,2.686,0.234v2.953H15.83c-1.49,0-1.955,0.925-1.955,1.874V12h3.328l-0.532,3.469h-2.796v8.384C19.612,22.952,23.998,17.988,23.998,12z" />
              </svg>
            </button>
            <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition duration-300">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
              </svg>
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Login3;
