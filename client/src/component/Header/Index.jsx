import React, { useState } from "react";
import { AiFillFacebook, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { HiMenu, HiX } from "react-icons/hi"; // Hamburger + Close icons
import "../../index.css";

const Header = () => {
  const [value, setValue] = useState("ENGLISH");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full z-10">
      <div className="top-strip py-2 border-t-[1px] border-b-[1px] border-s-cyan-50 bg-slate-800 text-white">
        <div className="container mx-auto flex justify-between items-center px-4">

          {/* Left Icons */}
          <div className="flex gap-3">
            <AiFillLinkedin size={22} className="cursor-pointer hover:text-cyan-300" />
            <AiFillFacebook size={22} className="cursor-pointer hover:text-cyan-300" />
            <AiFillInstagram size={22} className="cursor-pointer hover:text-cyan-300" />
            <FaSquareXTwitter size={22} className="cursor-pointer hover:text-cyan-300" />
          </div>

          {/* Center Message (hidden on small screens) */}
          <p className="text-[14px] font-medium hidden md:block">
            Get up to 50% off new season styles, limited time only
          </p>

          {/* Right Dropdowns (desktop) */}
          <div className="hidden md:flex space-x-3">
            <select
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="border px-2 py-1 rounded bg-slate-700 text-white text-[15px] focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="ENGLISH" className="bg-slate-700 text-white hover:bg-cyan-600">
                ENGLISH
              </option>
              <option value="HINDI" className="bg-slate-700 text-white hover:bg-cyan-600">
                HINDI
              </option>
              <option value="FRENCH" className="bg-slate-700 text-white hover:bg-cyan-600">
                FRENCH
              </option>
            </select>

            <select className="border px-2 py-1 rounded bg-slate-700 text-white text-[15px] focus:outline-none focus:ring-2 focus:ring-cyan-400">
              <option value="USD" className="bg-slate-700 text-white hover:bg-cyan-600">
                USD
              </option>
              <option value="EURO" className="bg-slate-700 text-white hover:bg-cyan-600">
                EURO
              </option>
            </select>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col items-center space-y-3 mt-3 pb-3 border-t border-gray-600 ">
            <p className="text-[14px] font-medium text-center">
              Get up to 50% off new season styles, limited time only
            </p>
            <select
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="border px-2 py-1 rounded bg-slate-700 text-white text-[15px] focus:outline-none focus:ring-2 focus:ring-cyan-400 w-40"
            >
              <option value="ENGLISH" className="bg-slate-700 text-white hover:bg-cyan-600">
                ENGLISH
              </option>
              <option value="HINDI" className="bg-slate-700 text-white hover:bg-cyan-600">
                HINDI
              </option>
              <option value="FRENCH" className="bg-slate-700 text-white hover:bg-cyan-600">
                FRENCH
              </option>
            </select>

            <select className="border px-2 py-1 rounded bg-slate-700 text-white text-[15px] focus:outline-none focus:ring-2 focus:ring-cyan-400 w-40">
              <option value="USD" className="bg-slate-700 text-white hover:bg-cyan-600">
                USD
              </option>
              <option value="EURO" className="bg-slate-700 text-white hover:bg-cyan-600">
                EURO
              </option>
            </select>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
