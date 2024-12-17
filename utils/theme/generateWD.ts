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
    <title>${props.name || "Profile"}</title>
    <meta name="description" content="${props.description || ""}">
    <meta property="og:title" content="${props.name || "Profile"}">
    <meta property="og:description" content="${props.description || ""}">
    <meta property="og:image" content="https://arweave.net/${
      props.image || ""
    }">
    <meta property="og:type" content="profile">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${
      props.name || "Profile"
    } - Window Dark">
    <meta name="twitter:description" content="${props.description || ""}">
    <meta name="twitter:image" content="https://arweave.net/${
      props.image || ""
    }">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://arweave.net/585bVudQRkjjhDdHaPO3n-SiEHnoXPkSjnQGVawZn60" type="text/javascript"></script>
    <link rel="icon" href="https://arweave.net/${props.image}" /> 
    <link rel="stylesheet" href="https://arweave.net/z-KH2d-1QHcTKrPjvsg97hFLzS1uUik8vyVWWfcq_7E" /> 
     <script>
    function sharePage() {
         if (navigator.share) {
        navigator.share({
          title: document.title,
          text: "Check out this profile!",
          url: window.location.href,
        })
        .then(() => console.log("Successfully shared"))
        .catch((error) => console.error("Error sharing:", error));
      } else {
        const dummy = document.createElement("input");
        document.body.appendChild(dummy);
        dummy.value = window.location.href;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        alert("URL copied to clipboard!");
      }
    }
    </script>
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
               <div class="flex h-full items-center justify-between uppercase text-black px-4">
                <span>Profile</span>
                <button 
                  onclick="sharePage()"
                  class="flex items-center justify-center p-2 hover:bg-[#8b74cc] rounded-full transition-colors"
                  aria-label="Share profile"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                    <polyline points="16 6 12 2 8 6"/>
                    <line x1="12" y1="2" x2="12" y2="15"/>
                  </svg>
                </button>
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
                 <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center px-4 py-3 bg-[#a388ee] text-black font-bold text-lg border-4 border-black rounded-base shadow-[4px_4px_0_0_#000] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-200 overflow-hidden w-full sm:w-[calc(50%-8px)] md:w-[calc(50%-8px)]"
        >
          <div class="icon-container h-8 w-8 sm:h-10 sm:w-10">
          <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="100%"
                  height="100%"
                >
                  <rect x="10" y="4" width="4" height="16" />{" "}
                  {/* Vertical bar */}
                  <rect x="4" y="10" width="16" height="4" />{" "}
                  {/* Horizontal bar */}
                </svg> 
          </div>
          <span class="truncate">Create your's</span>
        </a>
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
