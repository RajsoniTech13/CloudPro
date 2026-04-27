import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="bg-gfg-green text-white px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-md">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-2xl font-bold tracking-wide flex items-center">
          CloudPro
        </Link>
        <div className="hidden md:flex gap-4 font-medium text-sm">
          <Link to="/" className="hover:text-green-200 transition">Home</Link>
          <Link to="/docker" className="hover:text-green-200 transition">Docker</Link>
          <Link to="/aws" className="hover:text-green-200 transition">AWS</Link>
          <Link to="/blog" className="hover:text-green-200 transition">Blogs</Link>
          <Link to="/feedback" className="hover:text-green-200 transition">Feedback</Link>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm font-medium">
        {user ? (
          <>
            <span className="hidden sm:inline">Hello, <span className="font-semibold">{user.name}</span></span>
            <button 
              onClick={logout}
              className="bg-white text-gfg-green px-4 py-1.5 rounded shadow hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-green-200 transition">Sign In</Link>
            <Link 
              to="/register" 
              className="bg-white text-gfg-green px-4 py-1.5 rounded shadow hover:bg-gray-100 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
