import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {

  // const [error, setError] = useState("custom error")
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    // console.log(name, value);
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
    // console.log(e.target.email.value);
  }

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const { name, email, password } = signupInfo; // Destructure signupInfo
    if (!name || !email || !password) {
      return handleError('Name, Email & Password are required.'); // Error handling for empty fields
    }

    try {
      // Use relative URL if you have proxy set up in Vite
      const url = "http://localhost:3000/auth/signup"; // Change to relative URL for Vite proxy

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(signupInfo) // Explicitly pass the required fields
      });
      const result = await response.json(); // Parse the response JSON
      const { success, message, error } = result; // Destructure result

      if (success) {
        handleSuccess(message); // Handle successful signup
        setTimeout(() => {
          navigate('/auth/login'); // Navigate to login after successful signup
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message; // More robust error handling
        handleError(details); // Display error details
      } else if (!success) {
        handleError(message); // Handle any unexpected errors
      }
      console.log(result);
    } catch (err) {
      handleError(err); // Error handling for unexpected errors
    }
  };

  console.log('signupInfo ->', signupInfo);

  return (
    <>
      {/* <Navbar /> */}
      <div className=''>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up</h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSignup} className="space-y-6">

              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
              <div className="mt-2">
                <input
                  id="name"
                  onChange={handleChange}
                  name="name"
                  type="text"
                  placeholder='Eg: Rikesh'
                  autoComplete="Name"
                  value={signupInfo.name}
                  autoFocus
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-offset-secondary sm:text-sm sm:leading-6" />
              </div>

              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input
                  id="email"
                  onChange={handleChange}
                  name="email"
                  type="email"
                  placeholder='Eg: rikesh47@yahoo.com'
                  autoComplete="Email"
                  value={signupInfo.email}
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-offset-secondary sm:text-sm sm:leading-6" />
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
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
                  placeholder='Enter your password'
                  autoComplete="current-password"
                  value={signupInfo.password}
                  required
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>

              <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?
              <Link to="/auth/login" className="font-semibold leading-6 underline text-primary hover:text-primary"> Login</Link>
            </p>
          </div>
        </div>

      </div>
      <ToastContainer />
    </>
  )
}