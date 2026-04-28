import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0b1c2c] text-gray-300 pt-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">

        {/* LOGO + INFO */}
        <div>
          <h2 className="text-2xl font-bold text-pink-500 flex items-center gap-2">
            🛒 KART
          </h2>

          <p className="mt-4 text-sm">
            Powering Your World with the Best in Electronics.
          </p>

          <p className="mt-3 text-sm">
            123 Electronics St, Style City, NY 10001
          </p>

          <p className="text-sm mt-1">Email: support@zaptro.com</p>
          <p className="text-sm">Phone: (123) 456-7890</p>
        </div>

        {/* CUSTOMER SERVICE */}
        <div>
          <h3 className="text-lg font-semibold text-white">
            Customer Service
          </h3>

          <ul className="mt-4 space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Contact Us</li>
            <li className="hover:text-white cursor-pointer">
              Shipping & Returns
            </li>
            <li className="hover:text-white cursor-pointer">FAQs</li>
            <li className="hover:text-white cursor-pointer">
              Order Tracking
            </li>
            <li className="hover:text-white cursor-pointer">Size Guide</li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>

          <div className="flex gap-4 mt-4 text-lg">
            <FaFacebookF className="cursor-pointer hover:text-white" />
            <FaInstagram className="cursor-pointer hover:text-white" />
            <FaTwitter className="cursor-pointer hover:text-white" />
            <FaPinterestP className="cursor-pointer hover:text-white" />
          </div>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-lg font-semibold text-white">
            Stay in the Loop
          </h3>

          <p className="mt-4 text-sm">
            Subscribe to get special offers, free giveaways, and more
          </p>

          <div className="flex mt-4">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-3 py-2 rounded-l-md outline-none border text-black bg-white"
            />

            <button className="bg-pink-500 px-4 py-2 rounded-r-md text-white hover:bg-pink-600">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-700 mt-10 py-4 text-center text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="text-pink-500 font-semibold">EKart</span>. All rights
        reserved
      </div>
    </footer>
  );
};

export default Footer;