import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { FaGithub, FaGlobe } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import useAddress from "../../store/useAddress";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import useField from "../../store/useField";
import AllLink from "../../utils/AllLink";
import { uuidv7 } from "uuidv7";
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: Array<any> }) => Promise<any>;
      on?: (eventName: string, callback: (...args: any[]) => void) => void;
    };
  }
}

interface ProfileInfo {
  name?: string;
  description?: string;
  url?: string;
  twitter?: string;
  github?: string;
  avatar?: string;
}

export default function ENSFetcher() {
  const [address, setAddress] = useState<string>("");
  const [ens, setENS] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMetaMask, setHasMetaMask] = useState<boolean>(false);
  const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);
  const [error, setError] = useState<string>("");
  const ar_address = useAddress((state) => state.address);
  const setName = useField((state) => state.setName);
  const setDescription = useField((state) => state.setDescription);
  const setImage = useField((state) => state.setImage);
  const insertLink = useField((state) => state.insertLink);
  useEffect(() => {
    setHasMetaMask(typeof window !== "undefined" && !!window.ethereum);
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    if (!ar_address || !ar_address?.length) {
      navigate("/");
    }
  }, [ar_address]);
  const getProvider = () => {
    if (window.ethereum) {
      return new ethers.providers.Web3Provider(window.ethereum);
    }
    return new ethers.providers.JsonRpcProvider(
      "https://mainnet.infura.io/v3/408d8117e587491e86d5ab9baf5ceb03"
    );
  };

  const connectEthereum = async () => {
    if (window.ethereum) {
      try {
        const provider = getProvider();
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAddress(address);
        setIsConnected(true);
        await fetchENSAndProfile(address);
      } catch (error) {
        console.error("Failed to connect to Ethereum:", error);
        setError("Failed to connect to Ethereum");
      }
    } else {
      setError("Ethereum wallet not detected");
    }
  };
  const WalletFetch = () => {
    if (address.length) {
      fetchENSAndProfile(address)
        .then()
        .catch((err) => console.log(err));
    }
  };
  const fetchENSAndProfile = async (addressOrENS: string) => {
    setIsLoading(true);
    setError("");
    try {
      const provider = getProvider();
      let resolvedAddress = addressOrENS;
      let resolvedENS = null;

      if (ethers.utils.isAddress(addressOrENS)) {
        resolvedENS = await provider.lookupAddress(addressOrENS);
      } else {
        if (resolvedAddress) {
          const resolved = await provider.resolveName(addressOrENS);
          resolvedAddress = resolved || ""; //
          resolvedENS = addressOrENS;
        }
      }

      setAddress(resolvedAddress || "");
      setENS(resolvedENS || "No ENS found");

      if (resolvedENS) {
        const name = await provider.lookupAddress(resolvedAddress);
        const resolver = await provider.getResolver(resolvedENS);
        if (resolver) {
          const description = await resolver.getText("description");
          const url = await resolver.getText("url");
          const twitter = await resolver.getText("com.twitter");
          const github = await resolver.getText("com.github");
          const avatar = await resolver.getText("avatar"); // Fetch the avatar URL
          setProfileInfo({
            name: name || "",
            description: description || "",
            url: url || "",
            twitter: twitter || "",
            github: github || "",
            avatar: avatar || "",
          });
        } else {
          // If the resolver does not exist, set the error message
          setError("ENS information not found");
          setProfileInfo(null);
        }
      } else {
        setError("ENS information not found");
        setProfileInfo(null);
      }
    } catch (error) {
      console.error("Failed to fetch ENS and profile:", error);
      setError("Failed to fetch ENS and profile information");
    } finally {
      setIsLoading(false);
    }
  };
  async function urlToBase64(url: string) {
    // Fetch the image data
    const response = await fetch(url);
    const blob = await response.blob();

    // Convert the blob to base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
  const save = () => {
    console.log(profileInfo);
    if (profileInfo) {
      if (profileInfo.name?.length && profileInfo.name) {
        setName(profileInfo.name);
      }
      if (profileInfo.description?.length && profileInfo.description) {
        setDescription(profileInfo.description);
      }
      if (profileInfo.avatar?.length && profileInfo.avatar) {
        urlToBase64(profileInfo.avatar).then((result) => {
          setImage(result as string);
        });
      }
      if (profileInfo.twitter?.length && profileInfo.twitter) {
        const link = AllLink.find((e) => e.name === "X")!;
        const uuid = uuidv7();
        console.log(link.className);
        insertLink({
          name: "Twitter",
          url: `https://x.com/${profileInfo.twitter}`,
          icon: link?.icon ? link.icon : FaXTwitter,
          uuid: uuid,
          iconName: "X",
          className: "X",
        });
      }
      if (profileInfo.github?.length && profileInfo.github) {
        const link = AllLink.find((e) => e.name === "Github")!;
        const uuid = uuidv7();

        console.log(link.className);
        insertLink({
          name: "Github",
          url: `https://github.com/${profileInfo.github}`,
          icon: link?.icon ? link.icon : FaGithub,
          uuid: uuid,
          iconName: "Github",
          className: "Github",
        });
        if (profileInfo.url?.length && profileInfo.url) {
          const link = AllLink.find((e) => e.name === "Web")!;
          const uuid = uuidv7();

          console.log(link.className);
          insertLink({
            name: "Website",
            url: profileInfo.url,
            icon: link?.icon ? link.icon : FaGlobe,
            uuid: uuid,
            iconName: "Web",
            className: "Web",
          });
        }
      }
    }
    navigate("/theme");
  };
  const handleManualLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).elements.namedItem(
      "addressOrENS"
    ) as HTMLInputElement;
    if (input.value) {
      fetchENSAndProfile(input.value);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <NavBar />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="flex flex-col items-center w-full max-w-md">
          <div className="w-full border-4 border-black bg-white p-4 sm:p-6 shadow-[8px_8px_0_0_#000000]">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
              ENS Fetcher
            </h1>

            {!profileInfo ? (
              <>
                <div className="mb-8 p-4 border-2 border-black">
                  <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                    {isConnected ? "Wallet ENS Lookup" : "Connect Ethereum"}
                  </h2>
                  {hasMetaMask ? (
                    <>
                      {isConnected ? (
                        <button
                          onClick={WalletFetch}
                          className="w-full px-3 py-2 sm:px-4 sm:py-2 border-black rounded-md border-2 bg-[#d3f99d] hover:bg-[#50C878] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] font-bold tracking-widest mb-4 text-sm sm:text-base"
                        >
                          Fetch ENS
                        </button>
                      ) : (
                        <button
                          onClick={connectEthereum}
                          className="w-full px-3 py-2 sm:px-4 sm:py-2 border-black rounded-md border-2 bg-[#d3f99d] hover:bg-[#50C878] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] font-bold tracking-widest mb-4 text-sm sm:text-base"
                        >
                          Connect
                        </button>
                      )}
                    </>
                  ) : (
                    <a
                      href="https://metamask.io/download/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-3 py-2 sm:px-4 sm:py-2 border-black rounded-md border-2 bg-[#d3f99d] hover:bg-[#50C878] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] font-bold tracking-widest mb-4 text-sm sm:text-base text-center block"
                    >
                      Install MetaMask
                    </a>
                  )}
                </div>

                <div className="p-4 border-2 border-black">
                  <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                    Manual ENS Lookup
                  </h2>
                  <form onSubmit={handleManualLookup}>
                    <input
                      type="text"
                      name="addressOrENS"
                      placeholder="Enter Ethereum address or ENS name"
                      className="w-full px-3 py-2 sm:px-4 sm:py-2 border-2 border-black mb-4 text-sm sm:text-base"
                    />
                    <button
                      type="submit"
                      className="w-full px-3 py-2 sm:px-4 sm:py-2 border-black rounded-md border-2 bg-[#d3f99d] hover:bg-[#50C878] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] font-bold tracking-widest mb-4 text-sm sm:text-base"
                    >
                      Fetch ENS
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="p-4 border-2 border-black">
                {profileInfo.avatar && (
                  <img
                    src={profileInfo.avatar}
                    alt={`${profileInfo.name}'s Avatar`}
                    className="w-24 h-24 mb-4 rounded-full" // Adjust styling as needed
                  />
                )}
                <h2 className="text-xl font-bold mb-4">
                  {profileInfo.name || ens || "Profile"}
                </h2>
                <p className="font-mono break-all text-sm mb-2">
                  Address: {address}
                </p>
                <p className="font-mono text-sm mb-4">ENS: {ens}</p>
                {profileInfo.description && (
                  <p className="mb-2">{profileInfo.description}</p>
                )}
                {profileInfo.url && (
                  <p className="flex items-center mb-2">
                    <FaGlobe className="mr-2" size={16} />
                    <a
                      href={profileInfo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {profileInfo.url}
                    </a>
                  </p>
                )}
                {profileInfo.twitter && (
                  <p className="flex items-center mb-2">
                    <FaXTwitter className="mr-2" size={16} />
                    <a
                      href={`https://twitter.com/${profileInfo.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      @{profileInfo.twitter}
                    </a>
                  </p>
                )}
                {profileInfo.github && (
                  <p className="flex items-center mb-4">
                    <FaGithub className="mr-2" size={16} />
                    <a
                      href={`https://github.com/${profileInfo.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {profileInfo.github}
                    </a>
                  </p>
                )}
                <button
                  onClick={() => save()}
                  className="w-full px-3 py-2 sm:px-4 sm:py-2 border-black rounded-md border-2 bg-[#d3f99d] hover:bg-[#50C878] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] font-bold tracking-widest text-sm sm:text-base"
                >
                  Continue
                </button>
              </div>
            )}
          </div>
          {isLoading && <p className="mt-4 font-bold">Loading...</p>}
          {error && <p className="mt-4 text-red-600">{error}</p>}
          <button
            onClick={() => navigate("/theme")}
            className="mt-6 px-6 py-2 border-black rounded-md border-2 bg-white hover:bg-gray-100 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-gray-200 font-bold tracking-widest text-sm sm:text-base"
          >
            Skip
          </button>
        </div>
      </main>
    </div>
  );
}
