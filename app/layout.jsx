// Root Layout page for landing page and all pages too.

import React from 'react';
import './styles/globals.css';

const RootLayout = ({ children }) => {

  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
        {/* For Footer Social Media Icons */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
