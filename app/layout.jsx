// Layout page of Landing page (for non-logged-in users)

import React from 'react';
import './styles/globals.css';
import Header from './components/header'

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-100">
        <Header />
        <main>{children}</main>
        <footer className="bg-gray-800 text-white p-4">
          <p>&copy; 2024 DokumenHub</p>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
