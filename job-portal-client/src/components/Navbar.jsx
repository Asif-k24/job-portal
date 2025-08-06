import { handleSuccess } from "../utils";
import { Button } from "@chakra-ui/react";
import { CompanyLogo } from "./CompanyLogo";
import { useEffect, useState } from "react";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { useNavigate, NavLink, useLocation } from "react-router-dom";

const navItems = [
  { to: "/home", label: "Start a search", requiresLogin: false },
  { to: "/my-job", label: "My Jobs", requiresLogin: true },
  { to: "/salary", label: "Salary Estimate", requiresLogin: true },
  { to: "/post-job", label: "Post a Job", requiresLogin: true },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuToggler = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedInUser(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("Logged Out Successfully");
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 1000);
  };

  const isOnLoginPage = location.pathname === "/auth/login";
  const isOnSignupPage = location.pathname === "/auth/signup";
  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex justify-between items-center py-6">
        <NavLink to="/" className="flex items-center gap-2 text-2xl text-black">
          <CompanyLogo />
          <span>Job Portal</span>
        </NavLink>

        {/* Nav items for desktop */}
        <ul className="hidden md:flex gap-12 text-base text-primary">
          {navItems.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `mx-2 pb-1 border-b-2 ${
                    isActive
                      ? "border-blue text-blue font-semibold px-2"
                      : "border-transparent"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Auth buttons for desktop */}
        <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
          {loggedInUser ? (
            <button
              onClick={handleLogout}
              className="py-2 px-5 border rounded bg-blue text-white"
            >
              Logout
            </button>
          ) : (
            !isOnLoginPage && (
              <NavLink
                to="/auth/login"
                className="py-2 px-5 bg-gray-50 border rounded"
              >
                Log in
              </NavLink>
            )
          )}
          {!isOnSignupPage && !loggedInUser && (
            <NavLink
              to="/auth/signup"
              className="py-2 px-5 border rounded bg-blue text-white"
            >
              Sign up
            </NavLink>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden block">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-primary" />
            ) : (
              <FaBarsStaggered className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu items */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out transform md:hidden px-4 bg-gray-100 rounded-md ${
          isMenuOpen
            ? "max-h-[500px] py-5 opacity-100 scale-100 mb-5"
            : "max-h-0 opacity-0 scale-95 py-0 mb-0"
        }`}
      >
        <ul>
          {navItems
            // .filter((item) => !item.requiresLogin || loggedInUser)
            .map(({ to, label }) => (
              <li key={to} className="text-base text-gray-500 py-1">
                <NavLink to={to} onClick={handleMenuToggler}>
                  {label}
                </NavLink>
              </li>
            ))}
          {loggedInUser ? (
            <li className="text-gray-500 py-1">
              <button onClick={handleLogout}>Log out</button>
            </li>
          ) : (
            <>
              {!isOnLoginPage && !loggedInUser && (
                <li className="text-gray-500 py-1">
                  <NavLink to="/auth/login" onClick={handleMenuToggler}>
                    Log in
                  </NavLink>
                </li>
              )}
              {!isOnSignupPage && !loggedInUser && (
                <li className="text-gray-500 py-1">
                  <NavLink to="/auth/signup" onClick={handleMenuToggler}>
                    Sign up
                  </NavLink>
                </li>
              )}
            </>
          )}
        </ul>
      </div>
    </header>
  );
};
