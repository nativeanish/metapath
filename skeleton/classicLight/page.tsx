"use client";
import AllLink from "../..//utils/AllLink";
import React from "react";
import { IconType } from "react-icons/lib";
import "../global.css";
import ClassicButton from "../../components/ui/classicButton";
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
    className: string;
  }>;
}
const getClassName = (name: string) => {
  console.log(name);
  const link = AllLink.find((link) => link.name === name);
  if (link) {
    return link.className;
  }
  return "";
};

export default function ClassicLight(props: SocialLinkProps) {
  function formatString(input: string): string {
    return input.toLowerCase().replace(/[\s.]+/g, "-");
  }
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto pt-3">
        <div className="text-center">
          <div className=" w-32 h-32 rounded-3xl mx-auto flex items-center justify-center">
            {/* <img
              className="w-full h-full object-cover rounded-3xl"
              src="https://pbs.twimg.com/profile_images/1770559410554949632/cCYbnArw_400x400.jpg"
              alt="Anish Gupta"
            /> */}
            {props.image ? (
              <img
                className="w-full h-full object-cover rounded-3xl bg-white"
                src={props.image}
                alt={props.name ? props.name : "profile picture"}
              />
            ) : null}
          </div>
          <h2 className="mt-6 text-5xl font-extrabold text-gray-900">
            {props.name && props.name.length ? props.name : null}
          </h2>
          <p className="mt-5 text-md text-gray-600">
            {props.description && props.description.length
              ? props.description
              : null}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="mt-8 space-y-4 flex flex-col justify-center w-10/12 box-border font-bold">
            {props.social && props.social.length > 0
              ? props.social.map((item, index) => (
                  <ClassicButton
                    key={index}
                    icon={formatString(item.iconName)}
                    text={item.name}
                    href={item.url}
                    className={`${getClassName(item.className)}`}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
