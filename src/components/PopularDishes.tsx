import { useEffect, useState } from "react";
import DishPicture from "@/assets/Dish_picture.png";

interface Dishes {
    id:string;
    imageUrl:string;
    locationId:string;
    name:string;
    price:string;
    weight:string;
}

export const PopularDishes = () => {
  const [dishes, setDishes] = useState<Dishes[]>([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const FetchPopularDishes = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch(import.meta.env.VITE_POPULAR_DISHES, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json();
        setDishes(responseData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    };
    FetchPopularDishes();
  }, []);
  return (
    <section className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Most Popular Dishes</h2>

      {/* Show Loading Spinner or Text */}
      {loading ? (
        <div className="text-center text-gray-600 text-lg">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {dishes.map((dish, index) => (
            <div
              key={index}
              className="bg-white shadow-md cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 rounded-lg p-4"
            >
              <img
                src={DishPicture}
                alt={dish.name}
                className="w-full h-40 object-contain rounded-md"
              />
              <h3 className="mt-2 font-medium">{dish.name}</h3>
              <div className="flex items-center justify-between text-gray-500">
                <p>{dish.price}</p>
                <p>{dish.weight}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
