import React from "react";
import { IconType } from "react-icons/lib";
import "./index.css";

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

export default function WindowLight(props: SocialLinkProps) {
  return (
    <div className="mainM flex items-center justify-center h-screen text-black bg-[#dfe5f2]">
      <div className="outline-border rounded-md grid h-[800px] max-h-[100dvh] w-[1000px] max-w-[1000px] grid-cols-[100px_auto] rounded-base shadow-[10px_10px_0_0_#000] outline outline-4 w600:grid-cols-[70px_auto] w500:grid-cols-1 portrait:h-[100dvh]">
        <header className="border-r-border bg-[#a388ee] border-black relative flex items-center justify-center rounded-l-base border-r-4 bg-main w500:hidden portrait:rounded-none">
          <h1 className="-rotate-90 whitespace-nowrap text-[40px] font-bold tracking-[4px] smallHeight:text-[30px] smallHeight:tracking-[2px] w600:text-[30px] w600:tracking-[2px]">
            <span className="text-text inline-block">
              {props.name ? props.name : null}
            </span>
          </h1>
        </header>
        <main className="bg-[#e3dff2] relative flex h-[800px] max-h-[100dvh] flex-col rounded-br-base rounded-tr-base font-semibold portrait:h-[100dvh] portrait:max-h-[100dvh] portrait:rounded-none">
          <div className="main h-full max-h-full overflow-y-auto portrait:max-h-full bg-[#e3dff2]">
            <div className="border-b-border bg-[#a388ee] h-[50px] rounded-tr-base border-b-4 border-black text-xl w600:text-lg w400:h-10 w400:text-base portrait:rounded-none">
              <div className="flex h-full items-center justify-center uppercase text-black">
                Profile
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-10 text-black space-y-4 md:space-y-0 p-4 md:p-10 text-lg leading-[1.7] w600:text-lg w400:text-base">
              {props.image ? (
                <img
                  src={props.image}
                  alt={props.name ? props.name : "profile picture"}
                  className="w-40 h-40 bg-white rounded-full border-2 border-black md:h-28 md:w-28 xl:h-[184px] xl:w-[184px]"
                />
              ) : null}
              <p className="text-center md:text-left w-full md:w-auto">
                {props.description && props.description.length
                  ? props.description
                  : null}
              </p>
            </div>
            <div id="button" className="p-4 md:p-10">
              <div className="flex flex-wrap justify-center gap-4">
                {props.social && props.social.length > 0
                  ? props.social.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center px-4 py-3 bg-[#a388ee] text-black font-bold text-lg border-4 border-black rounded-base shadow-[4px_4px_0_0_#000] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-200 overflow-hidden w-full sm:w-[calc(50%-8px)] md:w-[calc(50%-8px)]"
                      >
                        <link.icon className="mr-2 text-2xl flex-shrink-0" />
                        <span className="truncate">{link.name}</span>
                      </a>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
