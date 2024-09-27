// Header component

'use client'; // Add this directive to make it a Client Component

import { signIn } from "next-auth/react"; // Import signIn from NextAuth

const Header = () => {
  const handleLogin = async () => {
    await signIn("google"); // Trigger Google sign-in
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <h1 className="text-xl">DokumenHub</h1>
      <button onClick={handleLogin}>
        Login with Google
      </button>
    </header>
  );
};

export default Header;
