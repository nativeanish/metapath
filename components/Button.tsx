import React from "react";

export default function Button({
  text,
  Icon,
  children,
  onClick,
}: {
  text: string;
  Icon: JSX.Element;
  children?: JSX.Element;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 space-y-4 flex flex-row justify-center items-center border-black rounded-md border-2 bg-[#ffffff] hover:bg-[#000000] hover:text-white hover:shadow-[2px_2px_0px_rgba(0,0,0,0)] active:bg-[#00E1EF] font-bold tracking-widest"
    >
      {children}
      {Icon}
      {text}
    </button>
  );
}
