import { Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { CompanyLogo } from "./CompanyLogo";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // const [error, setError] = useState("custom error")
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (location.state?.error) {
      handleError(location.state.error);
    }
  }, [location.state]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    // console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
    // console.log(e.target.email.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const { email, password } = loginInfo; // Destructure loginInfo
    if (!email || !password) {
      return handleError("Email & Password are required."); // Error handling for empty fields
    }

    try {
      // Use relative URL if you have proxy set up in Vite
      const url = "http://localhost:3000/auth/login"; // Change to relative URL for Vite proxy

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo), // Explicitly pass the required fields
      });
      const result = await response.json(); // Parse the response JSON
      const { success, message, data, error } = result; // Destructured result

      if (success) {
        localStorage.setItem("token", data.jwtToken);
        localStorage.setItem("loggedInUser", data.name);
        handleSuccess(message); // Handle successful signup
        setTimeout(() => {
          navigate("/home"); // Navigate to login after successful signup
          window.location.reload();
          window.scrollTo(0, 0);
        }, 1000);
      } else if (error) {
        const details = error.details[0].message; // More robust error handling
        handleError(details); // Display error details
      } else if (!success) {
        handleError(message); // Handle any unexpected errors
      }
      console.log(data);
    } catch (err) {
      handleError(err); // Error handling for unexpected errors
    }
  };

  console.log("loginInfo ->", loginInfo);

  return (
    <>
      <div className="">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Flex w="full" justifyContent="center">
              <CompanyLogo />
            </Flex>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Login
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleLogin} className="space-y-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Eg: rikesh47@yahoo.com"
                  autoFocus
                  onChange={handleChange}
                  value={loginInfo.email}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-between">
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
              <div className="mt-2">
                <input
                  id="password"
                  onChange={handleChange}
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={loginInfo.password}
                  required
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div className="flex justify-center pt-5">
                <button
                  type="submit"
                  className="flex w-72 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Don't have an account ?
              <Link
                to="/auth/signup"
                className="font-semibold leading-6 underline text-primary hover:text-primary"
              >
                {" "}
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
