import { Button } from "@/components/ui/button";
import logo from "../assets/vegetarian-_1_ 1.svg";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
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
        <NavLink
          to="/"
        //   className="text-green-600  border-b-2 border-green-600 pb-1"
        className={({ isActive }) =>
            isActive ? "text-green-500 font-bold underline" : "text-gray-600"
          }
        >
          Main Page
        </NavLink>
        <NavLink
          to="/bookTable"
        //   className="text-gray-600  hover:border-b-2 border-green-600 transition"
        className={({ isActive }) =>
            isActive ? "text-green-500 font-bold underline" : "text-gray-600"
          }
        >
          Book a Table
        </NavLink>
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
        {isUser ? <p>User</p> : <Link to='/login'>SignIn</Link>}
      </Button>
    </nav>
  );
};
