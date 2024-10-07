// Layout page of Home page (after login)

import React from 'react';
import Sidebar from '../components/sidebar';

const HomepageLayout = ({ children }) => {
    return (
        <div>
            <Sidebar />
            <header>
                <h2>Homepage Header</h2>
            </header>
            <main>{children}</main>
            <footer>
                <p>Homepage Footer</p>
            </footer>
        </div>
    );
};

export default HomepageLayout;
