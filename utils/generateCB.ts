import React from "react";
import { IconType } from "react-icons";
import { renderToStaticMarkup } from "react-dom/server";
import { ImageIcon } from "./icon/imageIcon";

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
  const generateBrutalistButton = (
    icon: string,
    text: string,
    href: string,
    isLast: boolean
  ) => {
    const icon_adddress = ImageIcon.find((item) => item.name === icon);
    return `
      <button class="brutalist-button w-full px-2 py-2 text-lg font-bold transition-all duration-200 rounded-none border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 focus:outline-none focus:ring-0 ${
        !isLast ? "mb-4" : ""
      }">
        <a href="${href}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center">
          <span class="truncate ml-2">${
            text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
          }</span>
          <img class="w-6 h-6 ml-2" aria-hidden="true" src="https://arweave.net/${
            icon_adddress?.arweave[0]
          }" alt="${icon}" />
        </a>
      </button>
    `;
  };

  const socialButtons =
    props.social && props.social.length > 0
      ? props.social
          .map((item, index) =>
            generateBrutalistButton(
              item.iconName,
              item.name,
              item.url,
              index === props.social!.length - 1
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
    <title>${props.name || "Profile"} - Brutalist Profile</title>
    <meta name="description" content="${props.description || ""}">
    <meta property="og:title" content="${
      props.name || "Profile"
    } - Brutalist Profile">
    <meta property="og:description" content="${props.description || ""}">
    <meta property="og:image" content="${props.image || ""}">
    <meta property="og:type" content="profile">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${
      props.name || "Profile"
    } - Brutalist Profile">
    <meta name="twitter:description" content="${props.description || ""}">
    <meta name="twitter:image" content="${props.image || ""}">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
      body {
        font-family: 'Inter', sans-serif;
      }
    </style>
</head>
<body class="min-h-screen bg-[#ffde2a] text-black py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md mx-auto pt-3">
    <div class="text-center">
      <div class="w-40 h-40 rounded-full mx-auto flex items-center justify-center border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        ${
          props.image
            ? `
          <img
            class="w-full h-full object-cover rounded-full bg-white"
            src="${props.image}"
            alt="${props.name ? props.name : "profile picture"}"
          />
        `
            : ""
        }
      </div>
      <h1 class="mt-6 text-5xl font-extrabold">${props.name || ""}</h1>
      <p class="mt-5 text-md">${props.description || ""}</p>
    </div>
    <div class="flex flex-col items-center justify-center">
      <div class="mt-8 flex flex-col justify-center w-full box-border font-bold">
        ${socialButtons}
      </div>
    </div>
  </div>
  <script>
    function getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    function getTextColor(backgroundColor) {
      const rgb = parseInt(backgroundColor.slice(1), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;

      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance > 0.5 ? "black" : "white";
    }

    function setButtonColors() {
      const buttons = document.querySelectorAll('.brutalist-button');
      const usedColors = new Set();

      buttons.forEach(button => {
        let backgroundColor;
        do {
          backgroundColor = getRandomColor();
        } while (usedColors.has(backgroundColor));

        usedColors.add(backgroundColor);
        const textColor = getTextColor(backgroundColor);

        button.style.backgroundColor = backgroundColor;
        button.style.color = textColor;
      });
    }

    // Set initial colors
    setButtonColors();

    // Add hover effects
    document.querySelectorAll('.brutalist-button').forEach(button => {
      button.addEventListener('mouseover', () => {
        button.style.transform = 'translate(4px, 4px)';
        button.style.boxShadow = 'none';
      });
      button.addEventListener('mouseout', () => {
        button.style.transform = '';
        button.style.boxShadow = '4px 4px 0px 0px rgba(0,0,0,1)';
      });
    });
  </script>
</body>
</html>
  `;

  return html;
}

export default async function generateCB(props: SocialLinkProps) {
  try {
    const htmlOutput = await generateHTML(props);
    return htmlOutput;
  } catch (error) {
    console.error("Error generating HTML:", error);
    return "An error occurred while generating the HTML.";
  }
}
