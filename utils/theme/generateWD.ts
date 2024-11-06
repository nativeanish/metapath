import React from "react";
import { IconType } from "react-icons/lib";
import { ReactIcon } from "../icon/ReactIcon";
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

function getIconSvg(icon: string): string {
  const icons = ReactIcon.find((key) => key.name === icon);
  if (icons) {
    return icons?.arweave[0];
  } else {
    return "#";
  }
}

export default async function generateWindowDarkHTML(
  props: SocialLinkProps
): Promise<string> {
  const socialLinks =
    props.social && props.social.length > 0
      ? props.social
          .map(
            (link, index) => `
        <a
          key="${index}"
          href="${link.url}"
          onclick="look('${link.uuid}')"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center px-4 py-3 bg-[#a388ee] text-black font-bold text-lg border-4 border-black rounded-base shadow-[4px_4px_0_0_#000] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-200 overflow-hidden w-full sm:w-[calc(50%-8px)] md:w-[calc(50%-8px)]"
        >
          <div class="icon-container h-8 w-8 sm:h-10 sm:w-10">
          <img src="https://arweave.net/${getIconSvg(link.iconName)}" alt="${
              link.name
            }" class="w-full h-full" />  
          </div>
          <span class="truncate">${link.name}</span>
        </a>
      `
          )
          .join("")
      : "";

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${props.name || "Profile"} - Window Dark</title>
    <meta name="description" content="${props.description || ""}">
    <meta property="og:title" content="${
      props.name || "Profile"
    } - Window Dark">
    <meta property="og:description" content="${props.description || ""}">
    <meta property="og:image" content="${props.image || ""}">
    <meta property="og:type" content="profile">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${
      props.name || "Profile"
    } - Window Dark">
    <meta name="twitter:description" content="${props.description || ""}">
    <meta name="twitter:image" content="${props.image || ""}">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://arweave.net/585bVudQRkjjhDdHaPO3n-SiEHnoXPkSjnQGVawZn60" type="text/javascript"></script>
    <link rel="stylesheet" href="https://arweave.net/z-KH2d-1QHcTKrPjvsg97hFLzS1uUik8vyVWWfcq_7E" /> 
</head>
<body>
    <div class="mainM flex items-center justify-center h-screen bg-[#212121]">
      <div class="outline-border rounded-md grid h-[800px] max-h-[100dvh] w-[1000px] max-w-[1000px] grid-cols-[100px_auto] rounded-base shadow-[10px_10px_0_0_#000] outline outline-4 w600:grid-cols-[70px_auto] w500:grid-cols-1 portrait:h-[100dvh]">
        <header class="border-r-border bg-[#a388ee] border-black relative flex items-center justify-center rounded-l-base border-r-4 bg-main w500:hidden portrait:rounded-none">
          <h1 class="-rotate-90 whitespace-nowrap text-[40px] font-bold tracking-[4px] smallHeight:text-[30px] smallHeight:tracking-[2px] w600:text-[30px] w600:tracking-[2px]">
            <span class="text-text inline-block">
              ${props.name ? props.name : ""}
            </span>
          </h1>
        </header>
        <main class="relative flex h-[800px] max-h-[100dvh] flex-col rounded-br-base rounded-tr-base bg-bg font-semibold portrait:h-[100dvh] portrait:max-h-[100dvh] portrait:rounded-none">
          <div class="main h-full max-h-full overflow-y-auto portrait:max-h-full">
            <div class="border-b-border dark:border-b-darkBorder bg-[#a388ee] h-[50px] rounded-tr-base border-b-4 border-black text-xl w600:text-lg w400:h-10 w400:text-base portrait:rounded-none">
              <div class="flex h-full items-center justify-center uppercase">
                Profile
              </div>
            </div>
            <div class="flex flex-col md:flex-row items-center md:items-start md:space-x-10 space-y-4 md:space-y-0 p-4 md:p-10 text-lg leading-[1.7] w600:text-lg w400:text-base">
              ${
                props.image
                  ? `
                <img
                  src="${props.image}"
                  alt="${props.name ? props.name : "profile picture"}"
                  class="w-40 h-40 bg-white rounded-full border-2 border-black md:h-28 md:w-28 xl:h-[184px] xl:w-[184px]"
                />
              `
                  : ""
              }
              <p class="text-center md:text-left w-full md:w-auto">
                ${
                  props.description && props.description.length
                    ? props.description
                    : ""
                }
              </p>
            </div>
            <div id="button" class="p-4 md:p-10">
              <div class="flex flex-wrap justify-center gap-4">
                ${socialLinks}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
</body>
</html>
  `;

  return html;
}
