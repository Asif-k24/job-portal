import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {

  const [error, setError] = useState("custom error")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  // const dispatch = useDispatch()

  // const notify = () => ;

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(e.target.email.value);

    fetch.post("https://localhost:3000/all-jobs", {
      email,
      password,
    })
      .then((res) => {        // if status code is 200    // status code  == 200
        navigate("/")
        toast.dismiss()
        // setUser(res.data.user.name)

        toast.success('Login Successful', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch(setReduxUser(res.data.user));
        localStorage.setItem("access_token", res.data.access_token);
      })
      .catch((err) => {       // status codes other than 200      // status codes !== 200
        // console.log("login failed..");
        // console.log(err.response.data.msg);
        // setError(err.response.data.msg)
        toast.dismiss()
        toast.error(err.response.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
  }

  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <>

        <div className='container'>
          <form className='hidden'>
            <input type="text" className='outline-none border px-4 py-2 rounded focus:drop-shadow-2xl focus:border-primary' />
            <input type="text" />
            <button>login</button>
          </form>
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login</h2>
            </div>
            {
              error
              &&
              (<div className='hidden mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-red-200 p-4'>
                {error}
              </div>)
            }

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                  <div className="mt-2">
                    <input id="email" value={email} onChange={(event) => {
                      setEmail(event.target.value)
                    }} name="email" type="email" autoComplete="Email" required className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-offset-secondary sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div className="text-sm">
                      <a href="#" className="font-semibold text-primary hover:text-secondary">Forgot password?</a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input id="password" value={password} onChange={(event) => {
                      setPassword(event.target.value)
                    }} name="password" type="password" autoComplete="current-password" required className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div>
                  <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?
                <Link to="/signup" className="font-semibold leading-6 text-primary hover:text-primary"> Sign Up</Link>
              </p>
            </div>
          </div>

        </div>
      </>
    </div>
  )
}
