import "./index.css";
import React from "react";
import { IconType } from "react-icons/lib";
interface SocialLinkProps {
  name: string;
  image: string;
  description: string;
  social?: Array<{
    name: string;
    url: string;
    icon: IconType;
    uuid: string;
  }>;
}
export default function BentoDark(props: SocialLinkProps) {
  return (
    <div className={`font-sans mainBody`}>
      <div className="text-text relative mx-auto h-full w-[700px] max-w-full p-8 md:p-16 xl:w-[1400px]">
        <div className="mb-12 w-full xl:fixed xl:mb-0 xl:w-[500px]">
          {props.image ? (
            <img
              className="border-border h-28 w-28 rounded-full border-2 xl:h-[184px] xl:w-[184px] bg-white"
              src={props.image}
              alt={props.name ? props.name : "profile picture"}
            />
          ) : null}
          <div className="mt-8">
            <h2 className="text-3xl font-heading sm:text-[44px]">
              {props.name && props.name.length ? props.name : null}
            </h2>
            <p className="mt-6 text-base font-base sm:text-xl">
              {props.description && props.description.length
                ? props.description
                : null}
            </p>
          </div>
        </div>
        <div className="justify-end xl:flex">
          <div
            id="grid-container"
            className="text-text text-black grid w-full grid-cols-2 gap-10 md:grid-cols-3 xl:w-1/2 xl:pb-16 w450:grid-cols-1 w450:gap-7"
          >
            {props.social && props.social.length > 0
              ? props.social.map((key, index) => (
                  <a
                    className=" bg-[#88aaee] shadow-light rounded-base border-4 border-black bg-main p-5 transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
                    key={index}
                    target="_blank"
                    href={key.url}
                  >
                    <div className="h-8 w-8 sm:h-10 sm:w-10">
                      {React.createElement(key.icon, { size: "2em" })}
                    </div>

                    <p className="mt-3 text-lg font-heading sm:text-xl">
                      {key.name}
                    </p>
                  </a>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
