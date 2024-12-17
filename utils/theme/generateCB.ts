import { IconType } from "react-icons";
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
  }>;
}

function generateHTML(props: SocialLinkProps): string {
  const generateBrutalistButton = (
    icon: string,
    text: string,
    href: string,
    uuid: string,
    isLast: boolean
  ) => {
    const icon_address = ImageIcon.find((item) => item.name === icon);
    return `
      <button class="brutalist-button w-full px-2 py-2 text-lg font-bold transition-all duration-200 rounded-none border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 focus:outline-none focus:ring-0 ${
        !isLast ? "mb-4" : ""
      }">
        <a href="${href}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center" onclick="look('${uuid}')">
          <span class="truncate ml-2">${
            text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
          }</span>
          <img class="w-6 h-6 ml-2" aria-hidden="true" src="https://arweave.net/${
            icon_address?.arweave[0]
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
              item.uuid,
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
    <title>${props.name || "Profile"}</title>
    <meta name="description" content="${props.description || ""}">
    <meta property="og:title" content="${
      props.name || "Profile"
    } - Brutalist Profile">
    <meta property="og:description" content="${props.description || ""}">
    <meta property="og:image" content="https://arweave.net/${
      props.image || ""
    }">
    <meta property="og:type" content="profile">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${
      props.name || "Profile"
    } - Brutalist Profile">
    <meta name="twitter:description" content="${props.description || ""}">
    <meta name="twitter:image" content="https://arweave.net/${
      props.image || ""
    }">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://arweave.net/585bVudQRkjjhDdHaPO3n-SiEHnoXPkSjnQGVawZn60" type="text/javascript"></script>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
      body {
        font-family: 'Inter', sans-serif;
      }
      .brutalist-shadow {
        box-shadow: 8px 8px 0px 0px rgba(0,0,0,1);
      }
    </style>
</head>
<body class="min-h-screen bg-[#ffde2a] text-black py-12 px-4 sm:px-6 lg:px-8">
  <button
    onclick="handleShare()"
    class="fixed top-4 right-4 md:top-8 md:right-8 z-10 flex items-center justify-center px-4 py-2 bg-white text-black font-bold rounded-none border-4 border-black brutalist-shadow hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all duration-200"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter" class="w-4 h-4 mr-2">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
      <polyline points="16 6 12 2 8 6"></polyline>
      <line x1="12" y1="2" x2="12" y2="15"></line>
    </svg>
    <span class="text-sm font-bold">SHARE</span>
  </button>

  <div class="max-w-md mx-auto pt-3">
    <div class="text-center">
      <div class="w-40 h-40 rounded-full mx-auto flex items-center justify-center border-4 border-black brutalist-shadow">
        ${
          props.image
            ? `
          <img
            class="w-full h-full object-cover bg-white rounded-full"
            src="${props.image}"
            alt="${props.name ? props.name : "profile picture"}"
          />
        `
            : ""
        }
      </div>
      <h1 class="mt-6 text-5xl font-extrabold">${props.name || ""}</h1>
      <p class="mt-5 text-md font-bold">${props.description || ""}</p>
    </div>
    <div class="flex flex-col items-center justify-center">
      <div class="mt-8 flex flex-col justify-center w-full box-border font-bold">
        ${socialButtons}
      </div>
    </div>
  </div>
  
  <div class="mt-20 max-w-xs mx-auto text-center">
    <div class="bg-white p-6 border-4 border-black brutalist-shadow">
      <h2 class="text-xl font-bold text-black mb-6">CREATE YOUR OWN PAGE</h2>
      <a
        href="https://yourplatform.com/join"
        class="inline-block bg-black text-white font-bold py-3 px-6 border-4 border-black hover:bg-white hover:text-black transition-all duration-200"
        target="_blank"
        rel="noopener noreferrer"
      >
        JOIN US NOW
      </a>
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
    document.querySelectorAll('.brutalist-button, .fixed').forEach(button => {
      button.addEventListener('mouseover', () => {
        button.style.transform = 'translate(4px, 4px)';
        button.style.boxShadow = 'none';
      });
      button.addEventListener('mouseout', () => {
        button.style.transform = '';
        button.style.boxShadow = '4px 4px 0px 0px rgba(0,0,0,1)';
      });
    });

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

    function look(uuid) {
      // Implement the look function if needed
      console.log("Clicked link with UUID:", uuid);
    }
  </script>
</body>
</html>
  `;

  return html;
}

export default async function generateCB(props: SocialLinkProps) {
  try {
    const htmlOutput = generateHTML(props);
    return htmlOutput;
  } catch (error) {
    console.error("Error generating HTML:", error);
    return "An error occurred while generating the HTML.";
  }
}
