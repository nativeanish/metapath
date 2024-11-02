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

async function generateHTML(props: SocialLinkProps): Promise<string> {
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
            (link) => `
        <a href="${link.url}" 
           target="_blank" 
           rel="noopener noreferrer" 
           class="flex items-center justify-center px-4 py-3 bg-[#a388ee] text-black font-bold text-lg border-4 border-black rounded-base shadow-[4px_4px_0_0_#000] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-200 overflow-hidden w-full sm:w-[calc(50%-8px)] md:w-[calc(50%-8px)]">
          <span class="icon-container mr-2 text-2xl flex-shrink-0">
         <img src="https://arweave.net/${getIconSvg(link.iconName)}" alt="${
              link.name
            }" class="w-full h-full">  
          </span>
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
    <title>${props.name || "Profile"} - Profile</title>
    <meta name="description" content="${props.description || ""}">
    <meta property="og:title" content="${props.name || "Profile"} - Profile">
    <meta property="og:description" content="${props.description || ""}">
    <meta property="og:image" content="${props.image || ""}">
    <meta property="og:type" content="profile">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${props.name || "Profile"} - Profile">
    <meta name="twitter:description" content="${props.description || ""}">
    <meta name="twitter:image" content="${props.image || ""}">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://arweave.net/3Y94ksheruWTnMzhiAq9WOYa13ajtU6PylPBAsTnlIM">
</head>
<body>
  <div class="mainM">
    <header class="header">
      <h1><span class="text-text inline-block">${props.name || ""}</span></h1>
    </header>
    <main class="content">
      <div class="content-header">
        <h2>Profile</h2>
      </div>
      <section class="profile-info">
        ${
          props.image
            ? `
          <img src="${props.image}" alt="${
                props.name || ""
              }'s profile picture" class="profile-image">
        `
            : ""
        }
        <p class="profile-description">${props.description || ""}</p>
      </section>
      ${
        props.social && props.social.length > 0
          ? `
        <section class="social-links" aria-labelledby="social-links-heading">
          <h3 id="social-links-heading" class="sr-only">Social Links</h3>
          ${socialLinks}
        </section>
      `
          : ""
      }
    </main>
  </div>
</body>
</html>
  `;

  return html;
}

export default async function generate(props: SocialLinkProps) {
  try {
    const htmlOutput = await generateHTML(props);
    return htmlOutput;
  } catch (error) {
    console.error("Error generating HTML:", error);
    return "An error occurred while generating the HTML.";
  }
}
