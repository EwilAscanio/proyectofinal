import Card from "@/components/Card";
import ImagenCard1 from "@/images/imagen2.jpg";
import ImagenCard2 from "@/images/imagen3.jpg";
import ImagenCard3 from "@/images/imagen4.jpg";

const page = () => {
  return (
    <>
      <div className="flex items-center justify-center flex-col ">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6 text-center [text-shadow:_0_2px_4px_rgb(99_102_241_/_0.8)]">
          Nuestros Servicios Principales
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <Card
            className="shadow-2xl transition-opacity duration-300 hover:opacity-80"
            image={ImagenCard1}
            title="Cuidado de Ganado"
            content="Ofrecemos servicios integrales de cuidado para ganado bovino, ovino y
          caprino, asegurando su salud y bienestar con las mejores prácticas
          veterinarias y de manejo."
          />

          <Card
            image={ImagenCard2}
            title="Produccion de Leche"
            content="Nuestra producción láctea se distingue por su calidad premium. Utilizamos técnicas modernas de ordeño y procesamiento para garantizar la frescura y pureza de nuestra leche."
          />

          <Card
            image={ImagenCard3}
            title="Productos Derivados"
            content="Elaboramos una variedad de productos derivados de alta calidad, incluyendo quesos artesanales, yogurt, mantequilla y otros lácteos, todos con el sabor auténtico del campo."
          />
        </div>
      </div>
    </>
  );
};

export default page;
