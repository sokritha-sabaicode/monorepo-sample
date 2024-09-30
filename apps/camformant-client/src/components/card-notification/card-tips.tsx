/* eslint-disable @next/next/no-img-element */
import React from "react";

interface TipCardProps {
  title: string;
  description: string;
  image: string;
}
const tips = [
  {
    title: "How to prepare for an Interview?",
    description:
      "Life presents a variety of situations in which someone will want to interview you.",
    image: "../../../images/tips1.png",
  },
  {
    title: "How to prepare for an Interview?",
    description:
      "Life presents a variety of situations in which someone will want to interview you.",
    image: "../../../images/tips2.png",
  },
  {
    title: "How to prepare for an Interview By Online?",
    description:
      "Life presents a variety of situations in which someone will want to interview you.",
    image: "../../../images/tips3.png",
  },
];

const TipCard: React.FC<TipCardProps> = ({ title, description, image }) => {
  return (
    <div className="flex items-center border-spacing-9 border-gray-50  shadow-md rounded-3xl  p-3 mb-6">
      <img
        src={image}
        alt={title}
        className="h-24 w-24 object-cover rounded-md mr-4"
      />
      <div>
        <h2 className="text-md font-semibold pb-3">{title}</h2>
        <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
      </div>
      <div className="ml-auto relative">
        <div className=" h-2 w-2 bg-blue-500 rounded-full absolute  top-10"></div>
      </div>
    </div>
  );
};

export const CardTips: React.FC = () => {
  return (
    <div className=" min-h-screen">
      <h1 className="text-sm text-gray-400 mb-6">
        We have some tip for you to interview
      </h1>
      <div>
        {tips.map((tip, index) => (
          <TipCard
            key={index}
            title={tip.title}
            description={tip.description}
            image={tip.image}
          />
        ))}
      </div>
    </div>
  );
};
