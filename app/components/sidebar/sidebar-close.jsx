// Closed Sidebar

"use client"; // Add this directive to make it a Client Component

import {
  FaHome,
  FaFileAlt,
  FaShareAlt,
  FaTrash,
  FaSignOutAlt,
} from "react-icons/fa";
import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";

const SidebarClosed = ({ profileData, toggleSidebar, logoutWithGoogle }) => {
  return (
    <div className="w-20 h-screen bg-gray-700 flex flex-col items-center relative transition-width duration-300">
      {/* Logo */}
      <div className="bg-pink-200" onClick={toggleSidebar}>
        <div className="flex mt-3 mb-2 p-4">
          <Image
            src={logo}
            alt="DokumenHub Logo"
            width={50}
            height={40}
            className="mr-2"
          />
        </div>
      </div>

      {/* Condensed Icons for Closed Sidebar */}
      <div className="flex flex-col items-center mt-12 space-y-8">
        <Image
          src={profileData.profileImage}
          alt="Profile"
          className="rounded-full"
          width={30}
          height={30}
        />
        <Link href={"/hub/homepage"}>
          <FaHome className="text-white text-xl" />
        </Link>
        <Link href={"/hub/documents"}>
          <FaFileAlt className="text-white text-xl" />
        </Link>
        <Link href={"/hub/shared"}>
          <FaShareAlt className="text-white text-xl" />
        </Link>
        <Link href={"/hub/trash"}>
          <FaTrash className="text-white text-xl" />
        </Link>
        <FaSignOutAlt
          className="text-white text-xl"
          onClick={logoutWithGoogle}
        />
      </div>
    </div>
  );
};

export default SidebarClosed;
