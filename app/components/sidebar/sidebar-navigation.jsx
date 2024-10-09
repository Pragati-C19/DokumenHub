// Sidebar navigation

"use client"; // Add this directive to make it a Client Component

import useSidebarToggle from "../../hooks/useSidebarToggle";
import useAuth from "../../hooks/useAuth";
import SidebarOpen from "./sidebar-open";
import SidebarClosed from "./sidebar-close";

const Sidebar = () => {
  const { isOpen, toggleSidebar } = useSidebarToggle();
  const { logoutWithGoogle } = useAuth();

  const profileData = {
    profileImage: localStorage.getItem("profile_image"),
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
  };

  // console.log("fn: Sidebar(): profileData - ", profileData)

  return (
    <div className="flex">
      {isOpen ? (
        <SidebarOpen
          profileData={profileData}
          toggleSidebar={toggleSidebar}
          logoutWithGoogle={logoutWithGoogle}
        />
      ) : (
        <SidebarClosed
          profileData={profileData}
          toggleSidebar={toggleSidebar}
          logoutWithGoogle={logoutWithGoogle}
        />
      )}
    </div>
  );
};

export default Sidebar;
