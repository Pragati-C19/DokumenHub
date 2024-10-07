// Home page (after login)

import Sidebar from '../components/sidebar';

const Homepage = () => {

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-4">Homepage Content</h1>
        <p className="text-lg">This is where your homepage content will go.</p>
      </div>
    </div>
  );
};

export default Homepage;
