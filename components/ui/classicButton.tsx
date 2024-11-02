import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  icon: string;
  text: string;
  href: string;
  className?: string;
}

export default function ClassicButton({
  icon,
  text,
  href,
  className,
}: ButtonProps) {
  const [color, setColor] = useState(
    twMerge(
      "rounded-md flex flex-row items-center justify-center space-x-4 p-1 rounded-md font-bold",
      `${className}`
    )
  );
  return (
    <a className={color} target="_blank" rel="noopener noreferrer" href={href}>
      <div className="h-10 w-10 sm:h-10 sm:w-10 flex items-center justify-center">
        <img src={`/icons/${icon}.svg`} alt={text} className="w-full h-full" />
      </div>
      <p className="sm:text-md ml-2 text-md">{text}</p>
    </a>
  );
}
