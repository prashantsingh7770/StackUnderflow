import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 border-t border-gray-200 py-10 font-[Poppins]">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & About */}
        <div>
          <h1 className="text-3xl font-extrabold mb-3">
            <span className="text-gray-900">Apni</span>
            <span className="text-blue-600">Shop</span>
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            Your one-stop online shop for fashion, electronics, and more.
            Quality products at the best prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-blue-600 transition">Home</a></li>
            <li><a href="/shop" className="hover:text-blue-600 transition">Shop</a></li>
            <li><a href="/about" className="hover:text-blue-600 transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-blue-600 transition">Contact</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Service</h3>
          <ul className="space-y-2">
            <li><a href="/faq" className="hover:text-blue-600 transition">FAQ</a></li>
            <li><a href="/returns" className="hover:text-blue-600 transition">Returns</a></li>
            <li><a href="/orders" className="hover:text-blue-600 transition">Track Order</a></li>
            <li><a href="/support" className="hover:text-blue-600 transition">Support</a></li>
          </ul>
        </div>

        {/* Social & Payment */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Connect with Us</h3>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="text-gray-500 hover:text-blue-600 transition">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-pink-500 transition">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-sky-500 transition">
              <FaTwitter size={20} />
            </a>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">We Accept</h3>
          <div className="flex space-x-4 text-gray-600">
            <FaCcVisa size={30} />
            <FaCcMastercard size={30} />
            <FaCcPaypal size={30} />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 mt-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="font-semibold text-gray-800">ApniShop</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
