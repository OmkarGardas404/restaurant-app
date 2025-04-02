import { Navbar } from "@/components/Navbar";
import TableList from "@/components/TableList";
import { dummyTables } from "@/constants/mockData";
import { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaClock,
  FaUser,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
// const locations = [
//   "48 Rustaveli Avenue",
//   "14 Baratashvili Street",
//   "9 Abashidze Street",
// ];
const BookTable = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [guests, setGuests] = useState<number>(1);
  const [showLocationDropdown, setShowLocationDropdown] =
    useState<boolean>(false);
  const [tables, setTables] = useState([]);
  const [locationId, setLocationId] = useState("");
  const [address, setAddress] = useState("");
  const handleFindTable = async () => {
    const queryParams = {
      locationId: locationId.toString(),
      address,
      time,
      guests: guests.toString(),
      date: date.toString(),
    };
    console.log(queryParams)
    console.log(`${import.meta.env.VITE_TABLES}?${queryParams}`);
    try {
        const apiUrl = `${import.meta.env.VITE_TABLES}?locationId=${locationId}&date=${date}&guests=${guests}`;
        console.log(apiUrl)
      const response = await fetch(
        apiUrl,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log("Response Data:", responseData);

      // Assuming responseData contains available tables
      setTables(responseData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const FetchLocationsOptions = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_LOCATIONS_OPTIONS, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json();
        console.log(responseData["tm16-locations-dev1"]);
        setLocations(responseData["tm16-locations-dev1"]);
        setLocationId(responseData["tm16-locations-dev1"][0].id);
        setAddress(responseData["tm16-locations-dev1"][0].address);
      } catch (error) {
        console.error(error);
      }
    };
    FetchLocationsOptions();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="relative bg-black/80 p-8 rounded-lg w-full mx-auto text-white mt-2">
        <h2 className="text-green-500 text-lg font-bold">
          Green & Tasty Restaurants
        </h2>
        <h1 className="text-3xl font-bold mb-6">Book a Table</h1>

        <div className="flex flex-wrap gap-4 items-center justify-center">
          {/* Location Selector */}
          <div className="relative">
            <button
              className="flex items-center gap-2 bg-white text-black px-4 py-3 rounded-lg w-64 justify-between"
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            >
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt />
                {selectedLocation || "Location"}
              </div>
              <RiArrowDropDownLine />
            </button>
            {showLocationDropdown && (
              <ul className="absolute left-0 w-64 bg-white text-black mt-1 rounded-lg shadow-lg">
                {locations.map((loc) => (
                  <li
                    key={loc.id}
                    className="p-2 hover:bg-green-100 cursor-pointer"
                    onClick={() => {
                      setSelectedLocation(loc.address);
                      setShowLocationDropdown(false);
                    }}
                  >
                    {loc.address}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Date Picker */}
          <div className="relative">
            <label className="flex items-center gap-2 bg-white text-black px-4 py-3 rounded-lg w-40 cursor-pointer">
              {/* <FaCalendarAlt /> */}
              <input
                type="date"
                className="bg-transparent outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
          </div>

          {/* Time Picker */}
          <div className="relative">
            <label className="flex items-center gap-2 bg-white text-black px-4 py-3 rounded-lg w-40 cursor-pointer">
              <FaClock />
              <input
                type="time"
                className="bg-transparent outline-none"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </label>
          </div>

          {/* Guest Counter */}
          <div className="flex items-center bg-white text-black px-4 py-3 rounded-lg w-40 justify-between">
            <FaUser />
            <button
              className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
              onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
            >
              <FaMinus />
            </button>
            <span>{guests}</span>
            <button
              className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
              onClick={() => setGuests((prev) => prev + 1)}
            >
              <FaPlus />
            </button>
          </div>

          {/* Find a Table Button */}
          <button
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
            onClick={handleFindTable}
          >
            Find a Table
          </button>
        </div>
      </div>
      <TableList tables={tables} date={date} />
    </div>
  );
};

export default BookTable;
