import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { BsCart3 } from "react-icons/bs";
import { TbLogin } from "react-icons/tb";
import Search from "./Search";
import Header from "./Index";
import { useAuth } from "@/Context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed w-full z-20 bg-white shadow-md border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4 font-[Poppins] text-gray-800 transition-all duration-300">
        {/* Logo */}
        <div
          className="text-3xl font-extrabold tracking-tight cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={() => navigate("/home")}
        >
          <span className="text-gray-900">Apni</span>
          <span className="text-blue-600">Shop</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 font-medium">
          {["home", "trending", "Customer Support"].map((page) => (
            <button
              key={page}
              onClick={() => navigate(`/${page}`)}
              className="relative group transition-colors duration-300 capitalize"
            >
              <span className="group-hover:text-blue-600">{page}</span>
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </button>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Show Search only on home */}
          {(location.pathname === "/" || location.pathname === "/home") && (
            <div className="hidden sm:block">
              <Search />
            </div>
          )}

          {/* Profile */}
          <button
            // onClick={() => navigate("/profile")}
            className="p-2 rounded-full hover:bg-gray-100 transition-all hidden sm:block"
          >
            <User size={22} className="text-gray-600 hover:text-blue-600" />
          </button>

          {/* Cart */}
          <button
            onClick={() => navigate("/cart")}
            className="hidden sm:flex items-center relative cursor-pointer group"
          >
            <span className="group-hover:text-blue-400 transition-colors duration-300 flex items-center">
              Cart <BsCart3 className="ml-2" size={18} />
            </span>
            <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-blue-400 group-hover:w-full transition-all duration-300"></span>
          </button>

          {/* Login / Logout */}
          <button
            onClick={() => (isAuthenticated ? logout() : navigate("/login"))}
            className="hidden sm:flex items-center relative cursor-pointer group"
          >
            <span className="group-hover:text-blue-400 transition-colors duration-300 flex items-center">
              {isAuthenticated ? "Logout" : "Login"}
              <TbLogin className="ml-2" size={18} />
            </span>
            <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-blue-400 group-hover:w-full transition-all duration-300"></span>
          </button>

          {/* Hamburger Icon (Mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200 px-6 py-4 space-y-4 font-[Poppins]">
          {/* Search on Mobile */}
          {(location.pathname === "/" || location.pathname === "/home") && <Search />}

          {/* Nav Links */}
          {["home", "trending"].map((page) => (
            <button
              key={page}
              onClick={() => {
                navigate(`/${page}`);
                setMenuOpen(false);
              }}
              className="block w-full text-left text-gray-700 hover:text-blue-600 transition"
            >
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </button>
          ))}

          <div className="flex flex-col gap-2 border-t border-gray-200 pt-3">
            {/* Profile */}
            <button
              onClick={() => {
                navigate("/profile");
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
            >
              <User size={20} /> Profile
            </button>

            {/* Cart */}
            <button
              onClick={() => {
                navigate("/cart");
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
            >
              <BsCart3 size={20} /> Cart
            </button>

            {/* Login / Logout */}
            <button
              onClick={() => {
                if (isAuthenticated) logout();
                else navigate("/login");
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
            >
              <TbLogin size={20} /> {isAuthenticated ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
