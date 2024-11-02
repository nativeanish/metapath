import { IconType } from "react-icons";
import { ReactIcon } from "./icon/ReactIcon";
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

export default async function BentoLight(
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
    <title>${props.name || "Profile"} - Bento Light</title>
    <meta name="description" content="${props.description || ""}">
    <meta property="og:title" content="${
      props.name || "Profile"
    } - Bento Light">
    <meta property="og:description" content="${props.description || ""}">
    <meta property="og:image" content="${props.image || ""}">
    <meta property="og:type" content="profile">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${
      props.name || "Profile"
    } - Bento Light">
    <meta name="twitter:description" content="${props.description || ""}">
    <meta name="twitter:image" content="${props.image || ""}">
    <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;600&display=swap" rel="stylesheet">
      <script src="https://cdn.tailwindcss.com"></script>
   <link href="https://arweave.net/jx_UMs0awkmdMyQpzrHc6Dj-f5VPKMUbUctrnsGEwQ8" rel="stylesheet"> 
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
        </div>
        <div class="justify-end xl:flex">
            <div id="grid-container" class="text-text grid w-full grid-cols-2 gap-10 md:grid-cols-3 xl:w-1/2 xl:pb-16 w450:grid-cols-1 w450:gap-7">
                ${socialLinks}
            </div>
        </div>
    </div>
</body>
</html>
  `;

  return html;
}
