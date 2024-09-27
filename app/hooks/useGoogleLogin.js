import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../utils/firebase-init";

const useGoogleLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginWithGoogle = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("fn: loginWithGoogle(): result.user", result.user);

        const userData = {
          user_name: user.displayName,
          email: user.email,
          google_auth_id: user.uid,
          profile_pic: user.photoURL,
        };

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
        if (!response.ok)
          throw new Error("Failed to save user in the database.");
        return response.json();
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loginWithGoogle, loading, error };
};

export default useGoogleLogin;
