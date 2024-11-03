"use client";
import { FaUpload } from "react-icons/fa";
import TooltipButton from "../TooltipButton";
import { HiRefresh } from "react-icons/hi";
import { getRandomAvatar } from "@fractalsoftware/random-avatar-generator";
import { ChangeEvent, useEffect } from "react";
import useField from "../../store/useField";

function ImageUploader() {
  const image = useField((state) => state.image);
  const setImage = useField((state) => state.setImage);

  // Generate avatar only on the client side
  useEffect(() => {
    if (!image) {
      setImage(
        `data:image/svg+xml;base64,${btoa(getRandomAvatar(25) as string)}`
      );
    }
  }, []);

  const regenerate = () => {
    setImage(
      `data:image/svg+xml;base64,${btoa(getRandomAvatar(25) as string)}`
    );
  };

  const upload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileType = e.target.files[0].type;
      if (
        fileType === "image/png" ||
        fileType === "image/svg+xml" ||
        fileType === "image/jpeg"
      ) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setImage(reader.result as string);
        });
        reader.readAsDataURL(e.target.files[0]);
      } else {
        console.log("You have not uploaded an image.");
      }
    }
  };

  return (
    <div className="relative w-48 flex flex-row items-center justify-center mt-8">
      <img
        src={image ? image : "#"}
        alt="Avatar"
        className="w-48 h-48 rounded-full object-cover border-2 border-black bg-white"
      />
      <div>
        <TooltipButton
          content="Upload Image"
          className="absolute bottom-0 left-2 object-cover hover:bg-black hover:text-white border-black h-8 w-8 border-2 bg-white text-black flex items-center justify-center rounded-md"
        >
          <>
            <FaUpload />
            <input
              type="file"
              onChange={upload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </>
        </TooltipButton>
        <TooltipButton
          content="Regenerate Image"
          className="absolute bottom-0 right-2 object-cover border-black hover:bg-black hover:text-white h-8 w-8 border-2 bg-white text-black flex items-center justify-center rounded-md"
          onClick={regenerate}
        >
          <HiRefresh />
        </TooltipButton>
      </div>
    </div>
  );
}

export default ImageUploader;
