import React from "react";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import Picture from "@/assets/Picture.png";

const LocationHeroSection = () => {
  return (
    <div className="mx-auto my-8 p-4  flex flex-col md:flex-row items-center md:items-start">
      {/* Left Side: Text Information */}
      <div className="w-full md:w-1/2 p-4">
        <h1 className="text-green-600 text-3xl font-bold">Green & tasty</h1>
        <div className="flex items-center mt-2">
          <FaMapMarkerAlt className="text-gray-600" />
          <p className="ml-2 text-gray-700 font-medium">address</p>
          <span className="ml-auto flex items-center text-yellow-500 font-bold">
            rating <FaStar className="ml-1" />
          </span>
        </div>
        <p className="text-gray-600 mt-4 leading-relaxed">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit animi repellat, officia aliquam neque accusamus, corporis nemo omnis porro a atque deleniti autem natus nihil cum earum fugiat hic vitae eligendi architecto!</p>
        <button className="mt-6 bg-green-600 text-white px-6 py-2 rounded-md text-lg font-medium hover:bg-green-700">
          Book a Table
        </button>
      </div>

      {/* Right Side: Image */}
      <div className="w-full md:w-1/2 p-4">
        <img
          src={Picture}
          alt="Image"
          className="w-full  md:object-contain h-64 md:h-full"
        />
      </div>
    </div>
  );
};

export default LocationHeroSection;
