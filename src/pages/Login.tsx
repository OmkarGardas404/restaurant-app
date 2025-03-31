import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import Logo from "../assets/vegetarian-_1_ 1.svg";
import { Link, useNavigate } from "react-router-dom";
import { loginService } from "@/api/loginService";

interface formType {
  email: string;
  password: string;
}
const initialState: formType = {
  email: "",
  password: "",
};
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };
  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password.length <= 0 && formData.email.length <= 0) {
      setErrors({
        email: true,
        password: true,
      });
    } else {
      try {
        const response = await loginService(formData);
        console.log(response);
        sessionStorage.setItem("token",response.accessToken);
        sessionStorage.setItem("role",response.role);
        sessionStorage.setItem("username",response.username);
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-neutral-100 p-10">
      {/* Container */}
      <div className="w-full h-full flex flex-col md:flex-row bg-neutral-100 rounded-lg overflow-hidden">
        {/* Left Section - Form */}
        <div className="flex flex-col w-full md:w-1/2 h-auto md:h-full p-6 sm:p-12">
          <p className="text-xs sm:text-sm text-gray-500 mb-3">WELCOME BACK</p>
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
            Sign In To Your Account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mt-4 sm:mt-5">
              <Label
                htmlFor="email"
                className="mb-1 block text-gray-700 text-sm"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`w-full h-12 p-3 border ${
                  errors.email
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:border-green-600 focus:ring focus:ring-green-300"
                } rounded-lg`}
              />
              {errors.email && (
                <span className="text-xs  font-medium text-red-400">
                  Email address is required. Please enter your email to continue
                </span>
              )}
            </div>

            <div className="mt-4 sm:mt-5">
              <Label
                htmlFor="password"
                className="mb-1 block text-gray-700 text-sm"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className={`w-full h-12 p-3 border ${
                  errors.password
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:border-green-600 focus:ring focus:ring-green-300"
                } rounded-lg`}
              />
              {errors.password && (
                <span className="text-xs font-medium text-red-400">
                  Password is required.Please enter you password to continue
                </span>
              )}
            </div>

            <Button
              type="submit"
              className="w-full mt-6 bg-green-600 text-white hover:bg-green-700 p-3 rounded-lg"
            >
              Sign In
            </Button>
          </form>

          <p className="mt-4 text-xs sm:text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 font-bold underline">
              Create an account
            </Link>
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full hidden md:flex flex-col md:w-1/2  md:items-center md:justify-center bg-gray-100 p-6 sm:p-10">
          <div className="flex items-center justify-center space-x-2 mb-4 sm:mb-10">
            <h1 className="text-4xl sm:text-6xl md:text-4xl font-extrabold text-green-600">
              Green
            </h1>
            <h1 className="text-4xl sm:text-6xl md:text-4xl font-extrabold text-black">
              {" "}
              & Tasty
            </h1>
          </div>
          <img
            src={Logo}
            alt="Green & Tasty"
            className="w-32 sm:w-48 md:w-64 lg:w-80 h-auto mt-4 sm:mt-10"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
