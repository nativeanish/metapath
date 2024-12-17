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

function getIconSvg(icon: string): string {
  const icons = ReactIcon.find((key) => key.name === icon);
  if (icons) {
    return icons?.arweave[0];
  } else {
    return "#";
  }
}

export default async function generateBL(
  props: SocialLinkProps
): Promise<string> {
  const socialLinks =
    props.social && props.social.length > 0
      ? props.social
          .map(
            (key) => `
        <a class="bg-[#88aaee] shadow-light rounded-base border-4 border-black bg-main p-5 transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
           key="${key.uuid}"
           target="_blank"
           rel="noopener noreferrer"
           onclick="look('${key.uuid}')"
           href="${key.url}">
          <div class="h-8 w-8 sm:h-10 sm:w-10">
          <img src="https://arweave.net/${getIconSvg(key.iconName)}" alt="${
              key.name
            }" class="w-full h-full">
          </div>
          <p class="mt-3 text-lg font-heading sm:text-xl">${key.name}</p>
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
    <link rel='icon' href="https://arweave.net/${props.image}>
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
    <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;600&display=swap" rel="stylesheet">
      <script src="https://cdn.tailwindcss.com"></script>
      <script src="https://arweave.net/585bVudQRkjjhDdHaPO3n-SiEHnoXPkSjnQGVawZn60" type="text/javascript"></script>
   <link href="https://arweave.net/jx_UMs0awkmdMyQpzrHc6Dj-f5VPKMUbUctrnsGEwQ8" rel="stylesheet"> 
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
    <div class="text-black relative mx-auto h-full w-[700px] max-w-full p-8 md:p-16 xl:w-[1400px]">
        <div class="mb-12 w-full xl:fixed xl:mb-0 xl:w-[500px]">
            ${
              props.image
                ? `
                <img
                    class="border-black h-28 w-28 rounded-full border-2 xl:h-[184px] xl:w-[184px] bg-white"
                    src="${props.image}"
                    alt="${props.name ? props.name : "profile picture"}"
                />
            `
                : ""
            }
            <div class="mt-8">
                <h1 class="text-3xl font-heading sm:text-[44px]">
                    ${props.name && props.name.length ? props.name : ""}
                </h1>
                <p class="mt-6 text-base font-base sm:text-xl">
                    ${
                      props.description && props.description.length
                        ? props.description
                        : ""
                    }
                </p>
            </div>
            <p className="mt-8 text-md">
              <button
              onclick="handleShare()"
              class="flex mt-6 flex-row items-center justify-center shadow-light rounded-base border-4 border-black bg-white p-3 rounded-md transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none">
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
        <div class="justify-end xl:flex">
            <div id="grid-container" class="text-text grid w-full grid-cols-2 gap-10 md:grid-cols-3 xl:w-1/2 xl:pb-16 w450:grid-cols-1 w450:gap-7">
                ${socialLinks}
                <a
              class="bg-[#88aaee] shadow-light rounded-base border-4 border-black bg-main p-5 transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
              href="#"
            >
              <div class="h-8 w-8 sm:h-10 sm:w-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="2em"
                  height="2em"
                >
                  <rect x="10" y="4" width="4" height="16" />{" "}
                  {/* Vertical bar */}
                  <rect x="4" y="10" width="16" height="4" />{" "}
                  {/* Horizontal bar */}
                </svg>
              </div>

              <p class="mt-3 text-lg font-heading sm:text-xl">
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
