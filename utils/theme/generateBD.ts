import React from "react";
import { IconType } from "react-icons";
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

async function generateHTML(props: SocialLinkProps): Promise<string> {
  // Arweave CSS URL
  const arweaveCssUrl =
    "https://arweave.net/5p_5fu5O8-GZB1d6TU2FaZrm5Q19tbrze5XxtaTHsuI"; // Replace with your actual Arweave transaction ID

  // SEO meta tags
  const seoTags = `
    <meta name="description" content="${props.description || ""}">
    <meta name="author" content="${props.name || ""}">
    <meta property="og:title" content="${props.name || "Profile"}">
    <meta property="og:description" content="${props.description || ""}">
    <meta property="og:image" content="https://arweave.net/${
      props.image || ""
    }">
    <meta property="og:type" content="profile">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${props.name || "Profile"}">
    <meta name="twitter:description" content="${props.description || ""}">
    <meta name="twitter:image" content="https://arweave.net/${
      props.image || ""
    }">
  `;

  // Function to get SVG content for react-icons
  function getIconSvg(icon: string): string {
    const icons = ReactIcon.find((key) => key.name === icon);
    if (icons) {
      return icons?.arweave[0];
    } else {
      return "#";
    }
  }

  const socialLinks =
    props.social && props.social.length > 0
      ? props.social
          .map(
            (key) => `
      <a class="social-link bg-[#88aaee] shadow-light rounded-base border-4 border-black bg-main p-5 transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
         key="${key.uuid}"
         target="_blank"
         onclick="look('${key.uuid}')"
         href="${key.url}">
        <div class="icon-container h-8 w-8 sm:h-10 sm:w-10">
          <img src="https://arweave.net/${getIconSvg(key.iconName)}" alt="${
              key.name
            }" class="w-full h-full"> 
        </div>
        <p class="social-name mt-3 text-lg font-heading sm:text-xl">${
          key.name
        }</p>
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
    ${seoTags}
    <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;600&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://arweave.net/585bVudQRkjjhDdHaPO3n-SiEHnoXPkSjnQGVawZn60" type="text/javascript"></script>
    <link rel="stylesheet" href="${arweaveCssUrl}">
    <style>
      /* Additional styles not included in the Arweave CSS file */
      .icon-container svg {
        width: 100%;
        height: 100%;
      }
    </style>
    <script>
     function handleShare() {
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
<body class="mainBody">
    <div class="content-wrapper text-text relative mx-auto h-full w-[700px] max-w-full p-8 md:p-16 xl:w-[1400px]">
        <div class="profile-info mb-12 w-full xl:fixed xl:mb-0 xl:w-[500px]">
            ${
              props.image
                ? `
              <img class="profile-image border-border h-28 w-28 rounded-full border-2 xl:h-[184px] xl:w-[184px] bg-white"
                   src="${props.image}"
                   alt="${props.name ? props.name : "profile picture"}" />
            `
                : ""
            }
            <div class="profile-text mt-8">
                <h2 class="profile-name text-3xl font-heading sm:text-[44px]">
                    ${props.name && props.name.length ? props.name : ""}
                </h2>
                <p class="profile-description mt-6 text-base font-base sm:text-xl">
                    ${
                      props.description && props.description.length
                        ? props.description
                        : ""
                    }
                </p>
                <p className="mt-8 text-md">
              <button
              onclick="handleShare()"
              class="flex mt-6 flex-row items-center justify-center shadow-light rounded-base border-4 border-black bg-white p-3 rounded-md transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-4 h-4 mr-2"
                >
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                  <polyline points="16 6 12 2 8 6"></polyline>
                  <line x1="12" y1="2" x2="12" y2="15"></line>
                </svg>
                Share
              </button>
            </p>
            </div>
        </div>
        <div class="social-links-wrapper justify-end xl:flex">
            <div id="grid-container" class="social-grid text-text text-black grid w-full grid-cols-2 gap-10 md:grid-cols-3 xl:w-1/2 xl:pb-16 w450:grid-cols-1 w450:gap-7">
                ${socialLinks}
                       <a class="social-link bg-[#88aaee] shadow-light rounded-base border-4 border-black bg-main p-5 transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
                    href="#"
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
                            <p class="social-name mt-3 text-lg font-heading sm:text-xl">
                      Create Your's
                    </p>
                  </a>
            </div>
        </div>
    </div>
</body>
</html>
  `;
  return html;
}

export default async function generateBD(props: SocialLinkProps) {
  try {
    const htmlOutput = await generateHTML(props);
    return htmlOutput;
  } catch (error) {}
}
