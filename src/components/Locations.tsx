const locations = [
    { name: "Restaurant A", seating: "Indoors & Outdoors", capacity: 50, image: "/restaurant1.jpg" },
    { name: "Restaurant B", seating: "Indoor Dining", capacity: 75, image: "/restaurant2.jpg" },
    { name: "Restaurant C", seating: "Outdoor & Rooftop", capacity: 100, image: "/restaurant3.jpg" },
  ];
  
  export const Locations = () => {
    return (
      <section className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Locations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {locations.map((loc, index) => (
            <div key={index} className="bg-white shadow-md hover:cursor-pointer transition delay-150 duration-300 ease-in-out  hover:scale-90 rounded-lg p-4">
              <img src={loc.image} alt={loc.name} className="w-full h-40  object-cover rounded-md" />
              <h3 className="mt-2 font-medium">{loc.name}</h3>
              <p className="text-gray-500">{loc.seating}</p>
              <p className="text-gray-500">Total Capacity: {loc.capacity}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  