// Login button hook

'use client'; // Add this directive to make it a Client Component

import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../utils/firebase/firebase-init";
import { useRouter } from 'next/navigation'

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter()

  // Login User
  const loginWithGoogle = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("fn: loginWithGoogle(): result.user", result.user);

        const userData = {
          username: user.displayName,
          email: user.email,
          auth_uid: user.uid,
          profile_image: user.photoURL,
        };

        router.push('/hub/homepage')
        
        return fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
      })
      .then((response) => {
        console.log("Response status:", response);
        if (!response.ok) {
          throw new Error("Failed to save user in the database.");
        }
        console.log("User Login successfully.");
        return response.json();
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Logout User
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

  return { loginWithGoogle, logoutWithGoogle, loading, error };
};

export default useAuth;
