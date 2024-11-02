import React from "react";
import TooltipInput from "../../components/TooltipInput";
import TooltipTextArea from "../../components/TooltipTextArea";
import ImageUploader from "../../components/ui/ImageUploader";
import AddLinks from "../../components/ui/SearchLink";
import SocialLink from "../../components/ui/Social";
import useField from "../../store/useField";
import submit from "../../utils/submit";

export default function AsymmetricalBrutalistEditor() {
  const links = useField((state) => state.social);
  const name = useField((state) => state.name);
  const description = useField((state) => state.description);
  const setName = useField((state) => state.setName);
  const setDescription = useField((state) => state.setDescription);
  return (
    <div className="w-full p-4  border-r-4 border-black">
      <div className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <ImageUploader />
          <div className="w-full flex flex-col space-y-2">
            <p className="text-xl font-bold">Name</p>
            <TooltipInput
              type="text"
              content="Enter Your Name"
              value={name}
              onchange={(e) => setName(e)}
              // className="text-2xl font-bold text-center bg-transparent border-b-4 border-black focus:outline-none px-2"
              className="text-2xl font-bold border-black border-2 p-2 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            />
          </div>
          <div className="w-full flex flex-col space-y-2">
            <p className="text-xl font-bold">Bio</p>
            <TooltipTextArea
              // className=" text-center bg-white border-4 border-black p-2 focus:outline-none"
              className="text-2xl font-bold  border-black border-2 p-2 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              rows={3}
              content="Enter Your Description"
              value={description}
              onchange={(e) => setDescription(e)}
            />
          </div>
        </div>
        <div className="w-full flex flex-col space-y-2">
          <AddLinks />
          <>
            {links.map((link) => (
              <SocialLink uuid={link.uuid} key={link.uuid} />
            ))}
          </>
          <button
            onClick={submit}
            className="w-full p-3 bg-green-400 text-white font-bold text-center border-2 border-black hover:bg-green-800 transition-colors uppercase tracking-widest"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
