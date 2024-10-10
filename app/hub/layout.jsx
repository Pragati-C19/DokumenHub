// Layout page of Home page (after login)

import React from "react";
import Sidebar from "../components/sidebar/sidebar-navigation";

const HubLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-gradient-to-br from-pink-200 to-blue-300 p-4">
        {children}
      </div>
    </div>
  );
};

export default HubLayout;
