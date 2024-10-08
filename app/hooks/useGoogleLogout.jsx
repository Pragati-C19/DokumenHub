// Logout button Hook

// TODO: Page Deletion is Remain

'use client'; // Add this directive to make it a Client Component

import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase/firebase-init";
import { useRouter } from 'next/navigation'

const useGoogleLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter()

  const logoutWithGoogle = () => {
    setLoading(true);
    setError(null);

    // Attempt to sign out the user
    signOut(auth)
      .then(() => {
        console.log("User Logout successfully.");
        // Optionally, handle post-logout actions here (like redirecting)
        router.push('/')
      })
      .catch((err) => {
        // Capture any errors that occur during sign out
        setError(err.message);
        console.error("fn: logoutWithGoogle() : Error signing out:", err);
      })
      .finally(() => {
        // Reset loading state regardless of success or error
        setLoading(false);
      });
  };
  return { logoutWithGoogle, loading, error };
};

export default useGoogleLogout;
