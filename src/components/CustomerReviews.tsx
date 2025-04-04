import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

interface Review {
  id: number;
  name: string;
  date: string;
  rating: number;
  review: string;
  profileImage: string;
}

const reviewsData: Review[] = [
  {
    id: 1,
    name: "David",
    date: "Aug 6, 2024",
    rating: 5,
    review:
      "Absolutely loved this restaurant! The outdoor terrace was perfect for a relaxing evening, and the menu had so many fresh, healthy options...",
    profileImage: "/user1.jpg",
  },
  {
    id: 2,
    name: "User 1765",
    date: "Jul 15, 2024",
    rating: 5,
    review:
      "The best dining experience I’ve had in Tbilisi. The vegan options were fantastic, and the flavors in every dish were rich and authentic...",
    profileImage: "/user2.jpg",
  },
  {
    id: 3,
    name: "Giorgi",
    date: "Jul 4, 2024",
    rating: 4,
    review:
      "Great food and an excellent vibe! The place has a lively atmosphere, and the service was fantastic...",
    profileImage: "/user3.jpg",
  },
  {
    id: 4,
    name: "Anna",
    date: "Jun 29, 2024",
    rating: 4,
    review:
      "I visited with friends and was blown away by the creativity of the menu. Each dish was a blend of traditional Georgian flavors...",
    profileImage: "/user4.jpg",
  },
];

const sortOptions = [
  { label: "Top rated first", value: "top" },
  { label: "Low rated first", value: "low" },
  { label: "Newest first", value: "newest" },
  { label: "Oldest first", value: "oldest" },
];

const CustomerReviews: React.FC = () => {
  const [activeTab, setActiveTab] = useState("service");
  const [selectedSort, setSelectedSort] = useState("top");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const sortedReviews = [...reviewsData].sort((a, b) => {
    switch (selectedSort) {
      case "top":
        return b.rating - a.rating;
      case "low":
        return a.rating - b.rating;
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="w-full mx-auto p-6">
      {/* Title */}
      <h2 className="text-2xl font-semibold">Customer Reviews</h2>

      {/* Tabs */}
      <div className="flex space-x-6 border-b mt-4">
        <button
          className={`pb-2 font-medium ${activeTab === "service"
            ? "border-b-2 border-green-500 text-green-600"
            : "text-gray-500"
            }`}
          onClick={() => setActiveTab("service")}
        >
          Service
        </button>
        <button
          className={`pb-2 font-medium ${activeTab === "cuisine"
            ? "border-b-2 border-green-500 text-green-600"
            : "text-gray-500"
            }`}
          onClick={() => setActiveTab("cuisine")}
        >
          Cuisine experience
        </button>
      </div>

      {/* Sort dropdown */}
      <div className="flex justify-end mt-4">
        <div className="relative">
          <button
            className="bg-green-100 text-green-700 px-4 py-2 rounded-md flex items-center space-x-2"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span>
              {sortOptions.find((option) => option.value === selectedSort)?.label}
            </span>
            <IoIosArrowDown />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40 z-10">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-green-100"
                  onClick={() => {
                    setSelectedSort(option.value);
                    setDropdownOpen(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {sortedReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col"
          >
            <div className="flex items-center space-x-4">
              <img
                src={review.profileImage}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-medium">{review.name}</h4>
                <p className="text-gray-500 text-sm">{review.date}</p>
              </div>
            </div>

            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-yellow-500 ${i < review.rating ? "fill-current" : "opacity-50"
                    }`}
                />
              ))}
            </div>

            <p className="text-gray-600 mt-2">{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
