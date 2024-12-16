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
    const icon_adddress = ImageIcon.find((item) => item.name === icon);

    return `
      <a 
        onclick="look('${uuid}')" 
        class="${className} transform hover:scale-105 transition-all duration-300 rounded-lg flex flex-row items-center justify-center space-x-4 p-3 font-medium shadow-sm hover:shadow-md" 
        target="_blank" 
        rel="noopener noreferrer" 
        href="${href}"
      >
        <div class="h-6 w-6 sm:h-6 sm:w-6 flex items-center justify-center">
          <img src="https://arweave.net/${icon_adddress?.arweave[0]}"
           alt="${text}" class="w-full h-full">
        </div>
        <p class="text-lg">${text}</p>
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
    <meta property="og:image" content="https://arweave.net/${
      props.image || ""
    }">
    <meta property="og:type" content="profile">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${
      props.name || "Profile"
    } - Classic Light Profile">
    <meta name="twitter:description" content="${props.description || ""}">
    <meta name="twitter:image" content="https://arweave.net/${
      props.image || ""
    }">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://arweave.net/585bVudQRkjjhDdHaPO3n-SiEHnoXPkSjnQGVawZn60" type="text/javascript"></script>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      body {
        font-family: 'Inter', sans-serif;
        background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
      }
      .glass-effect {
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
    </style>
</head>
<body class="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
  <button
    onclick="handleShare()"
    class="fixed border-2 border-black top-4 right-4 md:top-8 md:right-8 z-10 flex items-center justify-center px-4 py-2 glass-effect text-gray-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 mr-2">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
      <polyline points="16 6 12 2 8 6"></polyline>
      <line x1="12" y1="2" x2="12" y2="15"></line>
    </svg>
    <span class="text-sm font-medium">Share</span>
  </button>
  
  <div class="max-w-md mx-auto pt-3">
    <div class="text-center space-y-8">
      <div class="w-32 h-32 rounded-2xl mx-auto flex items-center justify-center transform hover:rotate-3 transition-transform duration-300 shadow-lg">
        ${
          props.image
            ? `
          <img
            class="w-full h-full object-cover rounded-2xl bg-white border-black border-2"
            src="${props.image}"
            alt="${props.name ? props.name : "profile picture"}"
          />
        `
            : ""
        }
      </div>
      <div class="space-y-4">
        <h1 class="text-5xl font-bold text-gray-900 tracking-tight hover:tracking-wide transition-all duration-300">
          ${props.name || ""}
        </h1>
        <p className="mt-5 text-md text-gray-600"> ${
          props.description && props.description.length
            ? props.description
            : null
        } </p>
      </div>
    </div>
    
    <div class="flex flex-col items-center justify-center mt-12">
      <div class="space-y-3 flex flex-col justify-center w-full max-w-sm">
        ${socialButtons}
      </div>
    </div>
  </div>
  
  <div class="mt-20 max-w-xs mx-auto text-center">
    <div class="glass-effect rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <h2 class="text-xl font-bold text-gray-900 mb-6">Create Your Own Page</h2>
      <a
        href="https://yourplatform.com/join"
        class="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
        target="_blank"
        rel="noopener noreferrer"
      >
        Join Us Now
      </a>
    </div>
  </div>

  <script>
    function handleShare() {
      if (navigator.share) {
        navigator.share({
          title: '${props.name || "Profile"}',
          text: '${props.description || ""}',
          url: window.location.href,
        }).catch((error) => console.log('Error sharing', error));
      } else {
        const dummy = document.createElement('input');
        document.body.appendChild(dummy);
        dummy.value = window.location.href;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        alert('URL copied to clipboard!');
      }
    }
  </script>
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
