// Closed Sidebar

"use client"; // Add this directive to make it a Client Component

import { FaUser, FaSearch, FaHome, FaFileAlt, FaShareAlt, FaTrash, FaSignOutAlt } from "react-icons/fa"; // Icons
import Image from "next/image";
import logo from "../public/logo.png";


const SidebarClosed = ({ toggleSidebar, logoutWithGoogle }) => {
  return (
    <div className="w-20 h-screen bg-gray-700 flex flex-col items-center relative transition-width duration-300">
      
    {/* Logo */}
    <div className="bg-pink-200" onClick={toggleSidebar}>
        <div className="flex mt-3 mb-2 p-4" >
        <Image
            src={logo} // Change this to your logo file
            alt="DokumenHub Logo"
            width={50} // Set width as needed
            height={40}
            className="mr-2"
          />
        </div>
      </div>

      {/* Condensed Icons for Closed Sidebar */}
      <div className="flex flex-col items-center mt-12 space-y-8">
        <FaUser className="text-white text-xl" />
        <FaSearch className="text-white text-xl" />
        <FaHome className="text-white text-xl" />
        <FaFileAlt className="text-white text-xl" />
        <FaShareAlt className="text-white text-xl" />
        <FaTrash className="text-white text-xl" />
        <FaSignOutAlt className="text-white text-xl" />
      </div>
    </div>
  );
};

export default SidebarClosed;
