import React, { useEffect, useState } from "react";
import { FaSearch, FaChartBar, FaClock, FaTrashAlt } from "react-icons/fa";

import useDashboard from "../../store/useDashboard";
import { read_post, readUser, del } from "../../utils/readDash";
import { ReactIcon } from "../../utils/icon/ReactIcon";
import NavBar from "../../components/NavBar";

type PageViewsProps = {
  views: number;
  onDelete: () => void;
  handler: string;
};

const PageViews: React.FC<PageViewsProps> = ({ views, handler }) => (
  <div className="bg-white p-6 border-4 border-black">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold flex items-center">
        <FaChartBar className="mr-2" /> Page Views
      </h2>
      <button
        onClick={() => del(handler)}
        className="bg-red-500 text-white px-4 py-2 flex items-center font-bold hover:bg-red-600 transition-colors"
        aria-label={`Delete ${handler}`}
      >
        <FaTrashAlt className="mr-2" /> Delete Page
      </button>
    </div>
    <p className="text-5xl font-bold">{views}</p>
  </div>
);

type ClickedLinkProps = {
  name: string;
  time: string;
};

const ClickedLink: React.FC<ClickedLinkProps> = ({ name, time }) => {
  const [icon, setIcon] = useState("");
  useEffect(() => {
    const icon = ReactIcon.find((key) => key.name === name);
    if (icon) {
      setIcon(icon.arweave[0]);
    }
  }, [name]);
  useEffect(() => {
    console.log(time);
  }, [time]);
  return (
    <li className="flex justify-between items-center p-3 bg-gray-100 border-2 border-black">
      <span className="text-xl font-bold flex items-center">
        {/** @ts-ignore */}
        <img src={`https://arweave.net/${icon}`} className="mr-2 text-2xl" />
        {name}
      </span>
      <span className="flex items-center text-sm">
        <FaClock className="mr-1" size={16} />
        {new Date(Number(time)).toLocaleString()}
      </span>
    </li>
  );
};

export default function MetapathsAnalytics() {
  const [selectPost, setSelectPost] = useState<string | null>(null);
  const post = useDashboard((state) => state.post);
  const view = useDashboard((state) => state.view);

  const click = useDashboard((state) => state.click);
  useEffect(() => {
    if (selectPost) {
      useDashboard.setState({ click: [] });
      read_post(selectPost).then((e) => {
        if (e) {
          console.log(click);
        }
      });
    }
  }, [selectPost]);
  useEffect(() => {
    readUser().then(() => {});
  }, []);
  useEffect(() => {
    console.log(click);
  }, [click]);
  return (
    <div className="min-h-screen bg-gray-100 font-mono">
      <NavBar />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8 text-center uppercase">
          Metapaths Analytics
        </h1>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              className="w-full p-3 pl-10 bg-white border-4 border-black text-lg appearance-none cursor-pointer"
              onChange={(e) => setSelectPost(e.target.value)}
              value={selectPost ?? ""}
            >
              <option value="">Select a page</option>
              {post.map((page, index) => (
                <option key={index} value={page}>
                  {page}
                </option>
              ))}
            </select>
          </div>
        </div>
        {selectPost?.length ? (
          <>
            <div className="space-y-8">
              {view.map(
                (e, i) =>
                  e.handler === selectPost && (
                    <PageViews
                      key={i}
                      views={Number(e.view)}
                      onDelete={() => {}}
                      handler={e.handler}
                    />
                  )
              )}
              <div className="bg-white p-6 border-4 border-black">
                <h2 className="text-2xl font-bold mb-4">Clicked Links</h2>
                <ul className="space-y-4">
                  {click.map((e, i) => (
                    <ClickedLink key={i} name={e.name} time={e.time} />
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
