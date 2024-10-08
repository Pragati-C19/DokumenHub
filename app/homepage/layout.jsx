// Layout page of Home page (after login)

import React from 'react';
import Sidebar from '../components/sidebar';

const HomepageLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen">
        <Sidebar />
        {children}
      </div>
    );
};

export default HomepageLayout;
