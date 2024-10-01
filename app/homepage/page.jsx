// Home page (after login)

import LogoutButton from "../components/logout-button";

const Homepage = () => {

  return (
    <div>
      <LogoutButton />
      <h1>Welcome to the Homepage</h1>
      <p>This is your main page content.</p>
    </div>
  );
};

export default Homepage;
