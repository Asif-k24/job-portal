import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';

export default function Navbar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState();
    const navigate = useNavigate();
    const location = useLocation();

    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        setLoggedInUser(!!token) // Convert to boolean
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('loggedInUser')
        handleSuccess('Logged Out Successfully')
        setTimeout(() => {
            navigate('/auth/login')
        }, 1000)
    }

    return (
        <header className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
            <nav className='flex justify-between items-center py-6'>
                <NavLink to="/" className='flex items-center gap-2 text-2xl text-black'>
                    <svg
                        xmlns="http://www.w3.org/200/svg"
                        width="39"
                        height="30"
                        viewBox="0 0 29 30"
                        fill="none"
                    >
                        <circle
                            cx="12.0143"
                            cy="12.5143"
                            r="12.0143"
                            fill="#3575E2"
                            fillOpacity="0.4"
                        />
                        <circle cx="16.9857" cy="17.4857" r="12.0143" fill="#3575E2" />
                    </svg> <span>Job Portal</span>
                </NavLink>

                {/* nav items for large devices */}
                <ul className="hidden md:flex gap-12">
                    {/* {
                        navItems.map(({ path, title }) => ( */}
                            <li className="text-base text-primary">
                                <NavLink to="/home" className="mx-10">Start a search</NavLink>
                                <NavLink to="/my-job" className="mx-10">My Jobs</NavLink>
                                <NavLink to="/salary" className="mx-10">Salary Estimate</NavLink>
                                <NavLink to="/post-job" className="mx-10">Post a Job</NavLink>
                            </li>
                        {/* ))} */}
                </ul>

                {/* signup and login btn */}
                <div className='text-base text-primary font-medium space-x-5 hidden lg:block'>
                    {/* Logout button */}
                    {
                        loggedInUser ? (
                            <NavLink onClick={handleLogout} className='py-2 px-5 border rounded bg-blue text-white'>Logout</NavLink>
                        ) : (
                            // Login button
                            location.pathname !== '/auth/login' && <NavLink to="/auth/login" className='py-2 px-5 border rounded'>Log in</NavLink>
                        )
                    }
                    {
                        location.pathname !== '/auth/signup' && <NavLink to="/auth/signup" className='py-2 px-5 border rounded bg-blue text-white'>Sign up</NavLink>
                    }


                    {/* {
                        location.pathname !== '/auth/signup' && <NavLink to="/auth/signup" className='py-2 px-5 border rounded bg-blue text-white'>Sign up</NavLink>
                    } */}
                </div>

                {/* mobile menu */}
                <div className='md:hidden block'>
                    <button onClick={handleMenuToggler}>
                        {
                            isMenuOpen ? <FaXmark className='w-5 h-5 text-primary' /> : <FaBarsStaggered className='w-5 h-5 text-primary' />
                        }
                    </button>
                </div>

            </nav>

            {/* navitems for mobile */}
            <div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
                <ul>
                    <li className="text-base text-white first:text-white py-1"><NavLink onClick={handleMenuToggler} path="/home">Start a search</NavLink></li>
                    <li className="text-base text-white first:text-white py-1"><NavLink onClick={handleMenuToggler} path="/my-job">My Jobs</NavLink></li>
                    <li className="text-base text-white first:text-white py-1"><NavLink onClick={handleMenuToggler} path="/salary">Salary Estimate</NavLink></li>
                    <li className="text-base text-white first:text-white py-1"><NavLink onClick={handleMenuToggler} path="/post-job">Post A Job</NavLink></li>
                    {
                        loggedInUser ? (
                            <li className='text-white py-1'><NavLink onClick={handleLogout} to="/auth/login">Log out</NavLink></li>
                        ) : (
                            <li className='text-white py-1'><NavLink onClick={handleMenuToggler} to="/auth/login">Log in</NavLink></li>
                        )
                    }
                </ul>
            </div>
        </header>
    );
};
