// Root Layout page for landing page and all pages too.

import React from 'react';
import './styles/globals.css';

export const metadata = {
  title: "DokumenHub",
  description: "This is a Collaborative Document Editing Platform",
  icon: '/favicon.ico',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
