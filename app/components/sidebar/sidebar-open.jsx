// Opened Sidebar

"use client"; // Add this directive to make it a Client Component

import {
  FaHome,
  FaTrash,
  FaSignOutAlt,
  FaFileAlt,
  FaShareAlt,
} from "react-icons/fa";
import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";

const SidebarOpen = ({ profileData, toggleSidebar, logoutWithGoogle }) => {
  return (
    <div className="w-64 h-screen bg-gray-700 relative transition-width duration-300 font-serif">
      {/* Logo */}
      <div className="bg-pink-200 flex">
        <div
          className="flex mt-3 mb-2 p-4 items-center"
          onClick={toggleSidebar}>
          <Image
            src={logo}
            alt="DokumenHub Logo"
            width={50}
            height={40}
            className="mr-2"
          />
          <h1 className="py-2 font-serif font-bold text-xl text-black">
            DokumenHub
          </h1>
        </div>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center mt-6 space-y-2">
        <div>
          <Image
            src={profileData.profileImage}
            alt="Profile"
            className="rounded-full"
            width={40}
            height={40}
          />
        </div>
        <div className="text-center">
          <p className="text-white font-bold">{profileData.username}</p>
          <p className="text-gray-300 text-sm">{profileData.email}</p>
        </div>
      </div>

      {/* Search Bar */}
      {/* TODO: Search Bar Logic needs to user here */}
      <div className="px-6 mt-10">
        <input
          type="text"
          placeholder="Search"
          className="bg-white text-black placeholder-gray-400 rounded-full p-2 w-full py-2 pl-10 pr-3"
        />
      </div>

      {/* Sidebar Section */}
      <div className="flex flex-col mt-5 space-y-2 p-3">
        <Link
          href={"/hub/homepage"}
          className="flex items-center px-4 py-2 hover:bg-gray-800 rounded-full cursor-pointer">
          <FaHome className="text-white text-lg" />
          <span className="ml-4 text-white">Home</span>
        </Link>
        <Link
          href={"/hub/documents"}
          className="flex items-center px-4 py-2 hover:bg-gray-800 rounded-full cursor-pointer">
          <FaFileAlt className="text-white text-lg" />
          <span className="ml-4 text-white">Your Documents</span>
        </Link>
        <Link
          href={"/hub/shared"}
          className="flex items-center px-4 py-2 hover:bg-gray-800 rounded-full cursor-pointer">
          <FaShareAlt className="text-white text-lg" />
          <span className="ml-4 text-white">Shared Documents</span>
        </Link>
        <Link
          href={"/hub/trash"}
          className="flex items-center px-4 py-2 hover:bg-gray-800 rounded-full cursor-pointer">
          <FaTrash className="text-white text-lg" />
          <span className="ml-4 text-white">Trash</span>
        </Link>
        <button
          className="flex items-center px-4 py-2 hover:bg-gray-800 rounded-full cursor-pointer"
          onClick={logoutWithGoogle}>
          <FaSignOutAlt className="text-white text-lg" />
          <span className="ml-4 text-white">Log Out</span>
        </button>
      </div>

      {/* Copyright */}
      <div className="absolute bottom-4 text-gray-400 text-sm font-serif px-1">
        <p>Pragati_C19, &copy; 2024 DokumenHub.😻</p>
      </div>
    </div>
  );
};

export default SidebarOpen;
