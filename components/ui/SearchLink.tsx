"use client";

import useField from "../../store/useField";
import AllLink from "../../utils/AllLink";
import React, { useState, useRef, KeyboardEvent } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { uuidv7 } from "uuidv7";

type SocialLink = {
  name: string;
  icon: IconType;
};

export default function AddLinks({}: {}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<SocialLink[]>([]);
  const [selectedLink, setSelectedLink] = useState<SocialLink | null>(null);
  const insertLink = useField((state) => state.insertLink);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.length > 0) {
      const filteredSuggestions = AllLink.filter((link) =>
        link.name.toLowerCase().includes(term.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setSelectedLink(null);
    } else {
      setSuggestions([]);
      setSelectedLink(null);
    }
  };

  const handleSelectLink = (link: SocialLink) => {
    setSearchTerm(link.name);
    setSelectedLink(link);
    setSuggestions([]);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && suggestions.length === 1) {
      handleSelectLink(suggestions[0]);
    }
  };

  const handleAddLink = () => {
    if (selectedLink) {
      console.log(`Adding link: ${selectedLink.name}`);
      const uuid = uuidv7();
      insertLink({
        name: selectedLink.name,
        icon: selectedLink.icon,
        url: "",
        uuid: uuid,
        iconName: selectedLink.name,
        className: selectedLink.name,
      });
      setSearchTerm("");
      setSelectedLink(null);
    }
  };

  return (
    <div className="w-full flex flex-col space-y-4">
      <p className="text-xl font-bold">Links</p>

      <div className="relative">
        <div className="flex items-center border-2 border-black">
          {selectedLink && (
            <div className="flex items-center pl-2">
              <selectedLink.icon className="w-5 h-5 mr-2" />
            </div>
          )}
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for links to add..."
            value={searchTerm}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
            className="w-full p-3 pr-10 text-lg focus:outline-none"
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {suggestions.length > 0 && (
          <ul className="absolute w-full bg-white border-4 border-t-0 border-black mt-[-4px] z-10">
            {suggestions.map((link, index) => {
              const Icon = link.icon;
              return (
                <li
                  key={index}
                  className="p-2 hover:bg-purple-100 cursor-pointer flex items-center"
                  onClick={() => handleSelectLink(link)}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {link.name}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <button
        className="w-full p-3 bg-purple-500 text-white font-bold text-center border-2 border-black hover:bg-purple-600 transition-colors uppercase tracking-widest"
        onClick={handleAddLink}
      >
        <FaPlus className="inline mr-2" /> Add New Link
      </button>
    </div>
  );
}
