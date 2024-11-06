import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import useAddress from "../store/useAddress";
import {
  arweave_app_connect,
  async_connect,
  checkConnection,
  disconnect,
} from "../utils/arconnect";
import { MdDashboard } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { HiDocumentPlus } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
export default function NavBar({ text }: { text?: string }) {
  const router = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const address = useAddress((state) => state.address);
  useEffect(() => {
    window.addEventListener("arweaveWalletLoaded", () => {
      checkConnection()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    });
    console.log(address);
  }, [address]);
  const connectAr = () => {
    async_connect().then().catch(console.log);
    setIsOpen(false);
  };
  const Disconnect = () => {
    disconnect().then().catch(console.log);
    setIsOpen(false);
  };
  const arweave_connect = () => {
    arweave_app_connect().then().catch(console.log);
    setIsOpen(false);
  };
  return (
    <nav className="border border-black p-4 flex items-center justify-between bg-[#f5f5f5] text-black">
      {/* Main Brand Element */}
      <div className="text-2xl font-bold mx-auto sm:mx-0">
        <span className="bg-[#d3f99d] px-2 py-1 mr-1 border-black border-2 rounded-md shadow-[3px_3px_0_0_#000000]">
          M
        </span>
        etapaths
      </div>
      {text ? (
        <p className="text-xl font-bold hidden sm:block pr-9">{text}</p>
      ) : null}
      {address && address.length ? (
        <div className="hidden sm:block relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 border-black truncate-5 rounded-md border-2 bg-[#d3f99d] hover:bg-[#50C878] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] font-bold tracking-widest flex items-center"
          >
            {address.split(" ").slice(0, 6).join(" ") +
              (address.split(" ").length > 6 ? "..." : "")}
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div
                className=""
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <button
                  // onClick={() => connectAr()}
                  onClick={() => router("/dashboard")}
                  className=" flex items-center justify-between flex-row px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left border-black border-2"
                  role="menuitem"
                >
                  Dashboard
                  <MdDashboard className="w-6 h-6" />
                </button>
                <button
                  // onClick={() => connectAr()}
                  onClick={() => router("/theme")}
                  className=" flex items-center justify-between flex-row px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left border-black border-2"
                  role="menuitem"
                >
                  New Page
                  <HiDocumentPlus className="w-6 h-6" />
                </button>
                <button
                  onClick={() => Disconnect()}
                  className="flex items-center justify-between flex-row px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left border-black border-2"
                  role="menuitem"
                >
                  Disconnect
                  <FaSignOutAlt className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="hidden sm:block relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 border-black rounded-md border-2 bg-[#d3f99d] hover:bg-[#50C878] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] font-bold tracking-widest flex items-center"
          >
            Connect
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div
                className=""
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <button
                  onClick={() => connectAr()}
                  className=" flex items-center justify-between flex-row px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left border-black border-2"
                  role="menuitem"
                >
                  ArConnect
                  <img
                    src="/image/brand/arconnect.png"
                    alt="arconnect logo"
                    className="w-6 h-6"
                  />
                </button>
                <button
                  disabled
                  onClick={() => arweave_connect()}
                  className="flex items-center justify-between flex-row px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left border-black border-2"
                  role="menuitem"
                >
                  Arweave.app
                  <img
                    src="/image/brand/arweave.svg"
                    alt="arconnect logo"
                    className="w-6 h-6"
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
