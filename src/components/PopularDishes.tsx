const dishes = [
    { name: "Fresh Strawberry Salad", calories: 320, image: "/salad1.jpg" },
    { name: "Avocado Poke Rice Bowl", calories: 275, image: "/poke.jpg" },
    { name: "Seasonal Farmers Bowl", calories: 400, image: "/bowl.jpg" },
    { name: "Spring Roll", calories: 425, image: "/springroll.jpg" },
  ];
  
  export const PopularDishes = () => {
    return (
      <section className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Most Popular Dishes</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {dishes.map((dish, index) => (
            <div key={index} className="bg-white shadow-md hover : cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 rounded-lg p-4">
              <img src={dish.image} alt={dish.name} className="w-full h-40 object-cover rounded-md" />
              <h3 className="mt-2 font-medium">{dish.name}</h3>
              <p className="text-gray-500">{dish.calories} kcal</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  