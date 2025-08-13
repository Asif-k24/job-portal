import { useEffect, useState } from "react";
import { CompanyLogo } from "./CompanyLogo";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Flex, Spinner } from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";

export const Signup = () => {
  // const [error, setError] = useState("custom error")
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    role: "jobseeker",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(signupInfo);
  };

  useEffect(() => {
    console.log("Updated signupInfo:", signupInfo);
  }, [signupInfo]);

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true);
    const { name, email, password } = signupInfo; // Destructure signupInfo
    if (!name || !email || !password) {
      return handleError("Name, Email & Password are required."); // Error handling for empty fields
    }

    try {
      // Use relative URL if you have proxy set up in Vite
      const url = "http://localhost:3000/auth/signup"; // Change to relative URL for Vite proxy

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo), // Explicitly pass the required fields
      });
      const result = await response.json(); // Parse the response JSON
      const { success, message, error } = result; // Destructure result

      if (success) {
        handleSuccess(message); // Handle successful signup
        setTimeout(() => {
          navigate("/auth/login"); // Navigate to login after successful signup
        }, 1000);
        setLoading(false);
      } else if (error) {
        const details = error?.details[0].message; // More robust error handling
        handleError(details); // Display error details
        setLoading(false);
      } else if (!success) {
        handleError(message); // Handle any unexpected errors
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      handleError(err); // Error handling for unexpected errors
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Flex w="full" justifyContent="center">
              <CompanyLogo />
            </Flex>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign Up
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSignup} className="space-y-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div>
                <input
                  id="name"
                  onChange={handleChange}
                  name="name"
                  type="text"
                  placeholder="Eg: Rikesh"
                  autoComplete="Name"
                  value={signupInfo.name}
                  autoFocus
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-offset-secondary sm:text-sm sm:leading-6"
                />
              </div>

              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div>
                <input
                  id="email"
                  onChange={handleChange}
                  name="email"
                  type="email"
                  placeholder="Eg: rikesh47@yahoo.com"
                  autoComplete="Email"
                  value={signupInfo.email}
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-offset-secondary sm:text-sm sm:leading-6"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                {/* <div className="text-sm">
                    <a href="#" className="font-semibold text-primary hover:text-secondary">Forgot password?</a>
                  </div> */}
              </div>
              <div className="relative">
                <input
                  id="password"
                  onChange={handleChange}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={signupInfo.password}
                  required
                  className="px-2 pr-10 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {/* Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Role
                </label>
              </div>
              <div className="relative">
                <select
                  name="role"
                  id="role"
                  value={signupInfo.role}
                  onChange={handleChange}
                  className="peer appearance-none block w-full rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="jobseeker">Job Seeker</option>
                  <option value="employer">Job Poster</option>
                </select>

                {/* Dropdown Arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0l-4.24-4.25a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex justify-center rounded-md pt-14">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex min-w-60 justify-center items-center gap-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" color="white" />
                      Signing Up...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?
              <Link
                to="/auth/login"
                className="font-semibold leading-6 underline text-primary hover:text-primary"
              >
                {" "}
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
