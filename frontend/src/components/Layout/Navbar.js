import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Mini Blog Website</h1>

      <div className="flex items-center space-x-6">
        <Link to="/" className="hover:text-blue-400 transition-colors">
          Home
        </Link>
        {user && (
  <Link to="/create" className="hover:text-blue-400 transition-colors">
    Create Post
  </Link>
)}


        {!user ? (
          <>
            <Link to="/login" className="hover:text-blue-400 transition-colors">
              Login
            </Link>
            <Link
              to="/register"
              className="hover:text-blue-400 transition-colors"
            >
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition-colors"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
