"use client";
import React from "react";
import { IconType } from "react-icons/lib";

function formatString(input: string): string {
  return input.toLowerCase().replace(/[\s.]+/g, "-");
}

// Function to generate a random color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Function to check luminance and determine text color
const getTextColor = (backgroundColor: string) => {
  const rgb = parseInt(backgroundColor.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "black" : "white"; // Light -> dark text, dark -> light text
};

// Create an array to store used colors
const usedColors = new Set();

const BrutalistButton = ({
  icon,
  text,
  href,
  isLast,
}: {
  icon: string;
  text: string;
  href: string;
  isLast: boolean;
}) => {
  let backgroundColor;
  // Generate a unique color not already used
  do {
    backgroundColor = getRandomColor();
  } while (usedColors.has(backgroundColor));

  usedColors.add(backgroundColor);
  const textColor = getTextColor(backgroundColor);

  return (
    <button
      className={`w-full px-2 py-2 text-lg font-bold transition-all duration-200 rounded-none border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 focus:outline-none focus:ring-0 ${
        !isLast ? "mb-4" : ""
      }`}
      style={{ backgroundColor, color: textColor }}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center"
      >
        <span className="truncate ml-2">
          {text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()}
        </span>
        <img
          className="w-6 h-6 ml-2"
          aria-hidden="true"
          src={`/icons/${icon}.svg`}
          alt={icon}
        />
      </a>
    </button>
  );
};
interface SocialLinkProps {
  name: string;
  image: string;
  description: string;
  social?: Array<{
    name: string;
    url: string;
    icon: IconType;
    uuid: string;
    iconName: string;
  }>;
}
export default function ClassicBrut(props: SocialLinkProps) {
  return (
    <div className="min-h-screen bg-[#ffde2a] text-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto pt-3">
        <div className="text-center">
          <div className="w-40 h-40 rounded-full mx-auto flex items-center justify-center border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            {/* <img
              className="w-full h-full object-cover rounded-full"
              src="https://pbs.twimg.com/profile_images/1770559410554949632/cCYbnArw_400x400.jpg"
              alt="Anish Gupta"
            /> */}
            {props.image ? (
              <img
                className="w-full h-full object-cover rounded-full bg-white"
                src={props.image}
                alt={props.name ? props.name : "profile picture"}
              />
            ) : null}
          </div>
          <h2 className="mt-6 text-5xl font-extrabold">
            {props.name && props.name.length ? props.name : null}
          </h2>
          <p className="mt-5 text-md">
            {props.description && props.description.length
              ? props.description
              : null}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="mt-8 flex flex-col justify-center w-full box-border font-bold">
            {props.social && props.social.length > 0
              ? props.social.map((item, index) => (
                  <BrutalistButton
                    key={index}
                    icon={formatString(item.iconName)}
                    text={item.name}
                    href={item.url}
                    isLast={
                      props.social ? props.social.length - 1 === index : true
                    }
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
