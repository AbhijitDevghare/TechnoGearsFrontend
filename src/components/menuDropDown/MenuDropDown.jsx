import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function MenuDropDown() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); 
  const dropdownRef = useRef(null);

  const role = useSelector((state) => state?.auth?.data?.role);

  useEffect(() => {
    const loggedInStatus = JSON.parse(localStorage.getItem("isLoggedIn") || "false");
    setIsLoggedIn(loggedInStatus);
  }, []);

  useEffect(() => {
    if (role === "superadmin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [role]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative -left-2 -ml-4 pl-5" ref={dropdownRef}>
      <button
        className="btn btn-square btn-ghost"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block w-6 h-6 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-lg p-3 z-10">
          <li className="py-1 pl-4">
            <Link
              to="/"
              className="block hover:bg-gray-200 px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
           {!isLoggedIn &&
          <li className="py-1 pl-4">
            <Link
              to="/profile"
              className="block hover:bg-gray-200 px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </Link>
          </li>
}
          <li className="py-1 pl-4">
            <Link
              to="/products"
              className="block hover:bg-gray-200 px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
          </li>

          
          <li className="py-1 pl-4">
            <Link
              to="/orders"
              className="block hover:bg-gray-200 px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
             View Orders
            </Link>
          </li>

          <li className="py-1 pl-4">
            <Link
              to="/cart"
              className="block hover:bg-gray-200 px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
             View Cart
            </Link>
          </li>



          <li className="py-1 pl-4">
            <Link
              to="/about"
              className="block hover:bg-gray-200 px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </li>
          <li className="py-1 pl-4">
            <Link
              to="/contact"
              className="block hover:bg-gray-200 px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
          </li>


           {!isLoggedIn && (
          <li className="py-1 pl-4">
              <Link
                to="/auth/login"
                className="block hover:bg-gray-200 px-3 py-2 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                 Login
              </Link>
            </li>
          )}

          {!isLoggedIn && (
          <li className="py-1 pl-4">
              <Link
                to="/auth/adminLogin"
                className="block hover:bg-gray-200 px-3 py-2 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Admin Login
              </Link>
            </li>
          )}


          {isAdmin && (
          <li className="py-1 pl-4">
              <Link
                to="/admin"
                className="block hover:bg-gray-200 px-3 py-2 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Admin Panel
              </Link>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export default MenuDropDown;
