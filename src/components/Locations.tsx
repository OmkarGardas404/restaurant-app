import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import Picture from "@/assets/Picture.png";
import { useNavigate } from "react-router-dom";


const Locations = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    const FetchLocations = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_LOCATIONS, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json();
        setLocations(responseData["tm16-locations-dev1"]);
        console.log(locations);
      } catch (error) {
        console.error(error);
      }
    };
    FetchLocations();
  }, []);
  return (
    <section className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Locations</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {locations.map((loc, index) => (
          <div
            key={index}
            className="bg-white shadow-md hover:cursor-pointer transition delay-150 duration-300 ease-in-out  hover:scale-90 rounded-lg p-4"
            onClick={() => navigate(`/location/${loc.id}`)}
          >
            <img
              src={Picture}
              alt={loc.name}
              className="w-full h-40  object-contain rounded-md"
            />
            <div className="flex items-center">
              <FaMapMarkerAlt />
              <h3 className="m-2 font-medium">{loc.address}</h3>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-500">
                Total Capacity: {loc.totalCapacity}
              </p>
              <p className="text-gray-500">
                Average Occupancy: {loc.averageOccupancy}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Locations;
