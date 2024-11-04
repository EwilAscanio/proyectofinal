import Link from "next/link";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <div class="w-full px-4 py-6 md:flex md:items-center md:justify-between backdrop-blur-lg">
      <span class="text-sm text-gray-400 sm:text-center">
        © 2024 <Link href="#">EwilDev.com</Link>. Todos los derechos reservados.
      </span>
      <div class="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
        <Link href="#" class="text-gray-400 hover:text-gray-900">
          <FaGithub />
        </Link>

        <Link href="#" class="text-gray-400 hover:text-gray-900">
          <FaLinkedin />
        </Link>

        <Link href="#" class="text-gray-400 hover:text-gray-900">
          <FaFacebook />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
