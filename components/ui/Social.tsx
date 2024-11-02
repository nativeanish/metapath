"use client";
import React, { useEffect, useState } from "react";
import { X, Edit2, Check, Link as LinkIcon } from "lucide-react";
import { IconType } from "react-icons/lib";
import useField from "../../store/useField";

type SocialLinkProps = {
  uuid: string;
};

export default function SocialLink({ uuid }: SocialLinkProps) {
  const [isEditing, setIsEditing] = useState(false);
  // const [Icon, setIcon] = useState<React.ElementType>(icon);

  const changeLinkName = useField((state) => state.changeLinkName);
  const changeLinkUrl = useField((state) => state.changeLinkUrl);
  const getLink = useField((state) => state.getLink);
  const remove = useField((state) => state.removeLink);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [link, setLink] = useState<null | {
    name: string;
    url: string;
    icon: IconType;
  }>(null);

  const asyncc = () => {
    const prof = getLink(uuid);
    if (prof) {
      setLink({
        name: prof.name,
        url: prof.url,
        icon: prof.icon,
      });
      setName(prof.name);
      setUrl(prof.url);
    }
  };
  useEffect(() => {
    asyncc();
  }, [uuid]);
  const handleSave = () => {
    changeLinkName(uuid, name);
    changeLinkUrl(uuid, url);
    setIsEditing(false);
  };
  return (
    <>
      {link ? (
        <div className="w-full border-2 border-black p-4 mb-4 bg-white">
          <div className="flex items-center justify-between mb-4">
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-xl font-bold border-b-2 border-purple-500 focus:outline-none"
              />
            ) : (
              <h3 className="text-xl font-bold">{link.name}</h3>
            )}
            <div className="flex space-x-2">
              {/* <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-2 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors"
                aria-label={isEditing ? "Save changes" : "Edit link"}
              >
                {isEditing ? (
                  <Check size={20} onClick={handleSave} />
                ) : (
                  <Edit2 size={20} />
                )}
              </button> */}
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors"
                  aria-label={isEditing ? "Save changes" : "Edit link"}
                >
                  <Edit2 size={20} />
                </button>
              ) : null}
              <button
                onClick={() => remove(uuid)}
                className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                aria-label="Remove link"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          <div className="flex items-center border-2 border-black">
            <div className="bg-gray-100 p-2 border-r-2 border-black">
              <LinkIcon size={24} className="text-gray-500" />
            </div>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL"
              className="flex-grow p-2 focus:outline-none"
              disabled={!isEditing}
            />
            <div className="bg-gray-100 p-2 border-l-2 border-black text-gray-500">
              {React.createElement(link.icon, { size: 24 })}
              {/* <Icon size={24} className="text-gray-500" /> */}
            </div>
          </div>
          {isEditing && (
            <button
              onClick={handleSave}
              className="mt-4 w-full p-2 bg-purple-500 text-white font-bold text-center border-4 border-black hover:bg-purple-600 transition-colors uppercase tracking-widest"
            >
              Save Changes
            </button>
          )}
        </div>
      ) : null}
    </>
  );
}
