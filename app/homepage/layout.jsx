// Layout page of Home page (after login)

import React from 'react';

const HomepageLayout = ({ children }) => {
    return (
        <div>
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
