import React from "react";
import { IconType } from "react-icons/lib";
import AllLink from "../AllLink";
import { ImageIcon } from "../icon/imageIcon";

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

function formatString(input: string): string {
  return input.toLowerCase().replace(/[\s.]+/g, "-");
}

const getClassName = (name: string) => {
  const link = AllLink.find((link) => link.name === name);
  if (link) {
    return link.className;
  }
  return "";
};
function _generateCL(props: SocialLinkProps): string {
  const generateClassicButton = (
    icon: string,
    text: string,
    href: string,
    uuid: string,
    className: string
  ) => {
    const formattedIcon = formatString(icon);
    const icon_adddress = ImageIcon.find((item) => item.name === icon);

    return `
      <a onclick="look('${uuid}')" class="${className} rounded-md flex flex-row items-center justify-center space-x-4 p-1 font-bold " target="_blank" rel="noopener noreferrer" href="${href}">
        <div class="h-10 w-10 sm:h-10 sm:w-10 flex items-center justify-center">
          <img src="https://arweave.net/${icon_adddress?.arweave[0]}"
           alt="${text}" class="w-full h-full">
        </div>
        <p class="sm:text-md ml-2 text-md">${text}</p>
      </a>
    `;
  };

  const socialButtons =
    props.social && props.social.length > 0
      ? props.social
          .map((item) =>
            generateClassicButton(
              item.iconName,
              item.name,
              item.url,
              item.uuid,
              getClassName(item.className)
            )
          )
          .join("")
      : "";

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${props.name || "Profile"} - Classic Light Profile</title>
    <meta name="description" content="${props.description || ""}">
    <meta property="og:title" content="${
      props.name || "Profile"
    } - Classic Light Profile">
    <meta property="og:description" content="${props.description || ""}">
    <meta property="og:image" content="${props.image || ""}">
    <meta property="og:type" content="profile">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${
      props.name || "Profile"
    } - Classic Light Profile">
    <meta name="twitter:description" content="${props.description || ""}">
    <meta name="twitter:image" content="${props.image || ""}">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://arweave.net/585bVudQRkjjhDdHaPO3n-SiEHnoXPkSjnQGVawZn60" type="text/javascript"></script>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
      body {
        font-family: 'Inter', sans-serif;
      }
    </style>
</head>
<body class="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md mx-auto pt-3">
    <div class="text-center">
      <div class="w-32 h-32 rounded-3xl mx-auto flex items-center justify-center">
        ${
          props.image
            ? `
          <img
            class="w-full h-full object-cover rounded-3xl bg-white"
            src="${props.image}"
            alt="${props.name ? props.name : "profile picture"}"
          />
        `
            : ""
        }
      </div>
      <h1 class="mt-6 text-5xl font-extrabold text-gray-900">${
        props.name || ""
      }</h1>
      <p class="mt-5 text-md text-gray-600">${props.description || ""}</p>
    </div>
    <div class="flex flex-col items-center justify-center">
      <div class="mt-8 space-y-4 flex flex-col justify-center w-10/12 box-border font-bold">
        ${socialButtons}
      </div>
    </div>
  </div>
</body>
</html>
  `;

  return html;
}
export default async function generateCL(props: SocialLinkProps) {
  try {
    const htmlOutput = _generateCL(props);
    return htmlOutput;
  } catch (error) {
    console.error("Error generating HTML:", error);
    return "An error occurred while generating the HTML.";
  }
}
