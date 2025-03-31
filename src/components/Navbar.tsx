import { Button } from "@/components/ui/button";
import logo from "../assets/vegetarian-_1_ 1.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export const Navbar = () => {
  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsUser(true);
    }
  }, []);
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
      <div className="flex items-center gap-4">
        <img src={logo} alt="Green & Tasty Logo" className="w-8 h-8 " />
        <p className="text-s font-bold sm:text-xl text-green-600">
          Green & Tasty
        </p>
      </div>
      <div className="flex gap-8">
        <Link
          to="/"
          className="text-green-600  border-b-2 border-green-600 pb-1"
        >
          Main Page
        </Link>
        <Link
          to="/bookTable"
          className="text-gray-600  hover:border-b-2 border-green-600 transition"
        >
          Book a Table
        </Link>
        {isUser && (
          <Link
            to="/reservation"
            className="text-gray-600 hover:border-b-2 border-green-600 transition"
          >
            Reservation
          </Link>
        )}
      </div>

      {/* Sign In Button */}
      <Button
        variant="outline"
        className="hover:cursor-pointer text-green-600 border-green-500 font-semibold"
      >
        {isUser ? <p>User</p> : <p>SignIn</p>}
      </Button>
    </nav>
  );
};
