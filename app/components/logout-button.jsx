import useGoogleLogout from "../hooks/useGoogleLogout";

const logoutButton = () => {
  const { logoutWithGoogle, loading, error } = useGoogleLogout();

  return (
    <>
      <button
        onClick={logoutWithGoogle}
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded"
      >
        {loading ? "Logging out..." : "Logout with Google"}
      </button>
      
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </>
  );
};

export default logoutButton;
