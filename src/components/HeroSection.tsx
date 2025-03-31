import { Button } from "@/components/ui/button";
import bgImage from "../assets/headingImage.jpg";
export const HeroSection = () => {
  return (
    <section className="relative w-full h-[500px] md:h-72 flex items-center justify-center text-white">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center "
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative  text-center px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Fresh, Organic, & Delicious
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300">
          Experience the best farm-to-table dining with carefully crafted meals
          made from the freshest ingredients.
        </p>
        <div className="mt-6 flex gap-4 justify-center">
          <Button variant="default" className="px-6 py-3 text-lg bg-green-600">
            View Menu
          </Button>
        </div>
      </div>
    </section>
  );
};
