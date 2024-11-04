import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

const Login2 = () => {
  return (
    <div className="bg-slate-50 w-screen h-screen flex items-center justify-center">
      <div className="w-[30%] h-[80%] bg-white flex items-center justify-center shadow-2xl rounded-xl">
        <div className="h-[95%] flex flex-col justify-center items-center gap-6  overflow-hidden">
          <h1 className="font-bold text-2xl text-black">Sign In</h1>
          <div className="flex justify-between w-56">
            <div className="rounded-full border p-4 text-black border-black">
              <FaFacebookF />
            </div>
            <div className="rounded-full border p-4 text-black border-black">
              <FaGooglePlusG />
            </div>
            <div className="rounded-full border p-4 text-black border-black">
              <FaLinkedinIn />
            </div>
          </div>

          <span className="w-72 text-center text-black">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </span>

          <form className="space-y-4 md:space-y-6 w-72" action="#">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Nombre de Usuario
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-200 rounded-lg block w-full p-2.5  placeholder-gray-400 outline-none"
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-200 rounded-lg block w-full p-2.5  placeholder-gray-400 outline-none"
                required=""
              />
            </div>
          </form>
          <button className="bg-blue-600 text-lg font-bold w-48 rounded-3xl p-2 cursor-pointer text-white hover:scale-110 hover:transition hover:duration-700 transition duration-700">
            Sign In
          </button>
        </div>
      </div>

      <div className="w-[30%] h-[80%] bg-blue-600 flex items-center justify-center shadow-2xl rounded-xl">
        <div className="h-[95%] flex flex-col justify-center items-center gap-6  overflow-hidden">
          <h1 className="font-bold text-3xl text-white">Hello, Friend!!</h1>

          <span className="w-64 text-white text-center">
            Enter your personal details ans start journey with us.
          </span>

          <Link
            href="/"
            className="bg-transparent border text-lg font-bold w-48 rounded-3xl p-2 cursor-pointer text-white hover:scale-110 hover:transition hover:duration-700 transition duration-700 text-center"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login2;
