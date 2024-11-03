import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { FaGithub, FaGlobe } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
interface ProfileInfo {
  name: string;
  description: string;
  url: string;
  twitter: string;
  github: string;
  avatar?: string; // New field for avatar URL
}

export default function ENSFetcher() {
  const [address, setAddress] = useState<string>("");
  const [ens, setENS] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMetaMask, setHasMetaMask] = useState<boolean>(false);
  const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setHasMetaMask(typeof window !== "undefined" && !!window.ethereum);
  }, []);

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
                  onClick={() => {
                    /* Handle continue action */
                  }}
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
            onClick={() => {
              /* Handle skip action */
            }}
            className="mt-6 px-6 py-2 border-black rounded-md border-2 bg-white hover:bg-gray-100 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-gray-200 font-bold tracking-widest text-sm sm:text-base"
          >
            Skip
          </button>
        </div>
      </main>
    </div>
  );
}
