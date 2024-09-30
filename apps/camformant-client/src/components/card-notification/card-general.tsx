/* eslint-disable @next/next/no-img-element */
import React from "react";

interface NotificationProps {
  image: string | undefined;
  title: string;
  description?: string;
  time: string;
}

const notifications = [
  {
    title: "You have aNew post to see in CambHR",
    description:
      "Life presents a variety of situations in which someone will want to interview you.",
    time: "1 hour ago",
    image: "../../../images/G1.png",
  },
  {
    title: "How to prepare for an Interview?",
    description:
      "Life presents a variety of situations in which someone will want to interview you.",
    time: "1 hour ago",
    image: "../../../images/G2.png",
  },
  {
    title: "You have a New post to see in CamHR",
    description:
      "Life presents a variety of situations in which someone will want to interview you.",
    time: "1 hour ago",
    image: "../../../images/G3.png",
  },
  {
    title: "You have aNew post to see in CambHR",
    description:
      "Life presents a variety of situations in which someone will want to interview you.",
    time: "1 hour ago",
    image: "../../../images/G1.png",
  },
  {
    title: "How to prepare for an Interview?",
    description:
      "Life presents a variety of situations in which someone will want to interview you.",
    time: "1 hour ago",
    image: "../../../images/G2.png",
  },
  {
    title: "You have a New post to see in CamHR",
    description:
      "Life presents a variety of situations in which someone will want to interview you.",
    time: "1 hour ago",
    image: "../../../images/G3.png",
  },
  {
    title: "You have aNew post to see in CambHR",
    description:
      "Life presents a variety of situations in which someone will want to interview you.",
    time: "1 hour ago",
    image: "../../../images/G1.png",
  },
  {
    title: "How to prepare for an Interview?",
    description:
      "Life presents a variety of situations in which someone will want to interview you.",
    time: "1 hour ago",
    image: "../../../images/G2.png",
  },
  {
    title: "You have a New post to see in CamHR",
    description:
      "Life presents a variety of situations in which someone will want to interview you.",
    time: "1 hour ago",
    image: "../../../images/G3.png",
  },
];

const GeneralCard: React.FC<NotificationProps> = ({
  image,
  title,
  description,
  time,
}) => {
  return (
    <div className="flex items-center p-4 border border-gray-50 shadow-md  rounded-3xl mb-3 w-full ">
      <img
        src={image}
        alt="Company Logo"
        className="w-10 h-10 rounded-full mr-4"
      />
      <div className="flex-1">
        <p className="text-md font-2xl ">{title}</p>
        <p className="text-sm line-clamp-1">{description}</p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
      <div className="relative">
        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 absolute top-8 right-1 "></div>
      </div>
    </div>
  );
};

export const CardGeneral = () => {
  return (
    <div className=" flex flex-wrap justify-center  gap-y-3 mb-16">
      {notifications.map((tip, index) => (
        <GeneralCard
          key={index}
          title={tip.title}
          time={tip.time}
          image={tip.image}
          description={tip.description}
        />
      ))}
    </div>
  );
};
