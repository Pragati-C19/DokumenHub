// Header component

// TODO: Page Deletion is Remain

'use client'; // Add this directive to make it a Client Component

import LoginButton from "./login-button"
import LogoutButton from "./logout-button"

const Header = () => {

  return (
    <header className="bg-gray-800 text-white p-4">
      <h1 className="text-xl">DokumenHub</h1>
      <LoginButton />
      <br />
      <br />
      <LogoutButton />
    </header>
  );
};

export default Header;
