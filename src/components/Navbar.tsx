import { useEffect, useState, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import logo from "@/assets/vegetarian-_1_ 1.svg";
import { RxAvatar } from "react-icons/rx";
 
export const Navbar = () => {
  const [isUser, setIsUser] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
 
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const storedUsername = sessionStorage.getItem("username"); // Fetch username
    const storedRole = sessionStorage.getItem("role"); // Fetch role
 
    if (token) {
      setIsUser(true);
      if (storedUsername) setUsername(storedUsername);
      if (storedRole) setRole(storedRole);
    }
  }, []);
 
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("role"); // Remove role on logout
    setIsUser(false);
    setUsername("");
    setRole("");
    setDropdownOpen(false);
    navigate("/login");
  };
 
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
 
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white relative">
      <div className="flex items-center gap-4">
        <img src={logo} alt="Green & Tasty Logo" className="w-8 h-8" />
        <p className="text-s font-bold sm:text-xl text-green-600">Green & Tasty</p>
      </div>
 
      <div className="flex gap-8">
      <NavLink
          to="/"
        className={({ isActive }) =>
            isActive ? "text-green-500 font-bold underline" : "text-gray-600"
          }
        >
          Main Page
        </NavLink>
        <NavLink
          to="/bookTable"
        className={({ isActive }) =>
            isActive ? "text-green-500 font-bold underline" : "text-gray-600"
          }
        >
          Book a Table
        </NavLink>
        {isUser && (
          <NavLink
          to="/reservation"
        className={({ isActive }) =>
            isActive ? "text-green-500 font-bold underline" : "text-gray-600"
          }
        >
          Reservation
        </NavLink>
        )}
      </div>
 
      {/* User Dropdown */}
      {isUser ? (
        <div className="relative" ref={dropdownRef}>
          {/* <Button
            variant="ghost"
            className="hover:cursor-pointer  font-semibold"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <RxAvatar />
          </Button> */}
          <RxAvatar  onClick={() => setDropdownOpen(!dropdownOpen)} className="h-6 w-6 cursor-pointer"/>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-md border z-10">
              <p className="px-4 py-2 text-gray-600 font-semibold border-b">
                {username} ({role})
              </p>
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                My Profile
              </Link>
              <button
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link to="/login">
          <Button
            variant="outline"
            className="hover:cursor-pointer text-green-600 border-green-500 font-semibold"
          >
            Sign In
          </Button>
        </Link>
      )}
    </nav>
  );
};
 
 

 