
// TODO: Page Deletion is Remain

import useGoogleLogin from "../hooks/useGoogleLogin";

const LoginButton = () => {
  const { loginWithGoogle, loading, error } = useGoogleLogin();

  return (
    <>
      <button
        onClick={loginWithGoogle}
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded"
      >
        {loading ? "Logging in..." : "Login with Google"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </>
  );
};

export default LoginButton;
