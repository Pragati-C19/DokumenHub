// Home page (after login)

import Greeting from "../../components/homepage/greeting";
import RecentDocs from "@/app/components/homepage/recent-pages";

const Homepage = () => {

  return (
    <div className="p-10 flex flex-col font-serif h-full w-full">
      <Greeting />
      <RecentDocs />
    </div>
  );
};

export default Homepage;