import Imagen from "next/image";
import Link from "next/link";

const CardNew = ({ image, title, content }) => {
  return (
    <>
      {/* <div className="bg-white p-6 rounded-lg shadow-md flex justify-center items-center flex-col w-full">
        <Imagen
          src={image}
          height="800"
          width="800"
          className="max-w-full object-cover rounded-lg"
        ></Imagen>
        <h3 className="text-xl font-semibold text-blue-600 mb-3 mt-2">
          {title}
        </h3>
        <p className="text-gray-600 text-center">{content}</p>
      </div> */}

      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-blue-200">
        <div className="hover:hidden">
          <Link href="/">
            <Imagen className="rounded-t-lg " src={image} alt="" />
          </Link>
        </div>

        <div className="p-5">
          <Link href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
          </Link>
          <p className="mb-3 font-normal text-gray-700 ">{content}</p>
          <Link
            href="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Mas Informacion
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CardNew;
