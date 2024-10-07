// Sidebar Toggle Hook - It handles if sidebar is open or closed

'use client'; // Add this directive to make it a Client Component

import { useState } from "react";

const useSidebarToggle = () => {
  const [isOpen, setIsOpen] = useState(true); // Initial state is open

  // Function to toggle the sidebar state
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return { isOpen, toggleSidebar };
};

export default useSidebarToggle;
