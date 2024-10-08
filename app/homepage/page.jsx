// Home page (after login)

import Greeting from "../components/greeting";

const Homepage = () => {

  return (
    <>
      {/* Main content */}
      <div className="flex-1 bg-gradient-to-br from-pink-200 to-blue-300 p-4">
      <Greeting />
      </div>
    </>
  );
};

export default Homepage;
