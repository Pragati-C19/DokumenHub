// Sidebar navigation

"use client"; // Add this directive to make it a Client Component

import useSidebarToggle from "../hooks/useSidebarToggle"; 
import useAuth from "../hooks/useAuth";
import SidebarOpen from "./sidebar-open";
import SidebarClosed from "./sidebar-close";
import profilepic1 from "../public/profile-icons/profile-pic1.png"

const Sidebar = () => {

  const { isOpen, toggleSidebar } = useSidebarToggle();
  const { logoutWithGoogle } = useAuth();

  const profileData = {
    profileImage: profilepic1,
    username: "John Doe",
    email: "john.doe@example.com",
  };

  return (
    <div className="flex">
      {isOpen ? (
        <SidebarOpen profileData={profileData} toggleSidebar={toggleSidebar} logoutWithGoogle={logoutWithGoogle}/>
      ) : (
        <SidebarClosed toggleSidebar={toggleSidebar} logoutWithGoogle={logoutWithGoogle}/>
      )}
    </div>
  );
};

export default Sidebar;
