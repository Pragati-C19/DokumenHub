// Review Cards on Landing page

"use client"; // Add this directive to make it a Client Component

import Image from "next/image";
import styles from "../../styles/ReviewCards.module.css";
import profilepic1 from "../../public/profile-icons/profile-pic1.png";
import profilepic2 from "../../public/profile-icons/profile-pic2.png";
import profilepic3 from "../../public/profile-icons/profile-pic3.png";
import profilepic4 from "../../public/profile-icons/profile-pic4.png";
import profilepic5 from "../../public/profile-icons/profile-pic5.png";
import profilepic6 from "../../public/profile-icons/profile-pic6.png";

const reviews = [
  {
    id: 1,
    name: "SpongeBob SquarePants",
    profession: "Professional Jellyfish Catcher",
    feedback:
      "I was flipping Krabby Patties all day, but thanks to this app, I’m flipping documents like a pro! I’m now a productivity machine! I might even start a new trend: 'Documenting Under the Sea'—watch out, world, here comes SpongeBob's office!",
    profilePic: profilepic1,
  },
  {
    id: 2,
    name: "Misty",
    profession: "Water Pokémon Trainer",
    feedback:
      "I used to struggle with keeping track of my Pokémon training schedules, but now? I’m swimming through my tasks with ease! It’s like having a surfboard on a calm sea—totally smooth sailing! My projects have never been more ‘on wave’ than now!",
    profilePic: profilepic2,
  },
  {
    id: 3,
    name: "Shinchan",
    profession: "Professional Trouble Maker",
    feedback:
      "I was just trying to draw on the walls like a true artist, but this app turned my scribbles into real projects! Now, I can spend less time avoiding homework and more time eating yummy snacks! Who knew being organized could lead to more time for fun?",
    profilePic: profilepic3,
  },
  {
    id: 4,
    name: "Kim Possible",
    profession: "Teen Hero",
    feedback:
      "I’ve faced villains and saved the world, but nothing prepared me for the paperwork. This app has transformed my chaos into clarity! Now I can handle both saving the day and organizing my school projects. It’s like having a sidekick, minus the spandex!",
    profilePic: profilepic4,
  },
  {
    id: 5,
    name: "Doraemon",
    profession: "Future Robot Cat",
    feedback:
      "You know, after Nobita started using this incredible app, he’s gone from 'master procrastinator' to 'documenting dynamo'! I swear I saw him actually finish his homework on time. It’s like magic, but without the whole 'I'm a robot cat from the future' thing!",
    profilePic: profilepic5,
  },
  {
    id: 6,
    name: "Usagi Tsukino",
    profession: "Guardian of Love and Justice",
    feedback:
      "You wouldn’t believe how much easier my life has become! I’m managing my schoolwork like a true Sailor Scout now. Fighting evil by moonlight is a lot easier when your notes are organized! Who knew paperwork could be so much fun?",
    profilePic: profilepic6,
  },
];

const ReviewCards = () => {
  return (
    <div>
      <h2 className="mt-2 text-4xl font-serif font-bold italic text-center py-20">
        Grapevine Gossip
      </h2>

      <div className={`${styles.noScrollbar} overflow-x-auto px-8`}>
        <div
          className="flex transition-transform duration-500 mb-20"
          style={{
            width: `${(reviews.length * 100) / 3}%`, // Adjust the width based on number of reviews
          }}>
          {reviews.map((review) => (
            <div key={review.id} className="w-full md:w-1/3 p-8">
              <div className="h-full p-12 bg-white border border-gray-100 shadow-2xl rounded-3xl shadow-gray-600/10 flex flex-col justify-between">
                <div className="flex flex-col text-center items-center justify-center mb-2 h-full">
                  <Image
                    src={review.profilePic}
                    alt="profilepic"
                    width={80}
                    height={80}
                    className="mr-4"
                  />
                  <div>
                    <h6 className="text-lg font-medium text-gray-700">
                      {review.name}
                    </h6>
                    <p className="text-sm text-gray-500">{review.profession}</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-500 text-center font-serif">
                  {review.feedback}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewCards;
