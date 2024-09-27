// Header component

'use client'; // Add this directive to make it a Client Component

import LoginButton from "./login-button"

const Header = () => {

  return (
    <header className="bg-gray-800 text-white p-4">
      <h1 className="text-xl">DokumenHub</h1>
      <LoginButton />
    </header>
  );
};

export default Header;
