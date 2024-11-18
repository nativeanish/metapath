import { useEffect, useState } from "react";
import { ethers } from "ethers";

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

export default function Tes() {
  const [isENSDialogOpen, setIsENSDialogOpen] = useState(false);
  const [ensInput, setEnsInput] = useState("");
  const [hasMetaMask, setHasMetaMask] = useState<boolean>(false);
  const [ens, setENS] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setHasMetaMask(typeof window !== "undefined" && !!window.ethereum);
  }, []);
  const openENSDialog = () => setIsENSDialogOpen(true);
  const closeENSDialog = () => setIsENSDialogOpen(false);
  const getProvider = () => {
    if (window.ethereum) {
      return new ethers.providers.Web3Provider(window.ethereum);
    }
    return new ethers.providers.JsonRpcProvider(
      "https://mainnet.infura.io/v3/408d8117e587491e86d5ab9baf5ceb03"
    );
  };
  const [address, setAddress] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);

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
    <div className="min-h-screen bg-yellow-300 p-4 font-mono mt-9">
      <div className="max-w-2xl mx-auto bg-white border-8 border-black p-8 shadow-[16px_16px_0_0_rgba(0,0,0,1)]">
        <h1 className="text-5xl font-bold mb-8 text-center uppercase border-b-8 border-black pb-4">
          MetaPaths
        </h1>

        <div className="space-y-8">
          <button
            onClick={openENSDialog}
            className="w-full bg-blue-500 text-white py-6 text-2xl font-bold uppercase border-4 border-black hover:bg-blue-600 active:translate-y-1 transition-transform"
          >
            Use ENS
          </button>
          <div className="text-center text-3xl font-bold">- OR -</div>
          <button className="w-full bg-red-500 text-white py-6 text-2xl font-bold uppercase border-4 border-black hover:bg-red-600 active:translate-y-1 transition-transform">
            Create New Page
          </button>
        </div>

        <div className="mt-12 pt-8 border-t-8 border-black text-center">
          <p className="text-lg font-bold uppercase">
            Decentralized. Secure. Yours.
          </p>
        </div>
      </div>

      {isENSDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white border-8 border-black p-8 max-w-md w-full shadow-[16px_16px_0_0_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-bold mb-6 uppercase">ENS Options</h2>
            <div className="space-y-6">
              {hasMetaMask ? (
                <>
                  {isConnected ? (
                    <>
                      <button
                        onClick={() => {}}
                        className="w-full bg-green-500 text-white py-4 text-xl font-bold uppercase border-4 border-black hover:bg-green-600 active:translate-y-1 transition-transform"
                      >
                        Fetch ENS
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={connectEthereum}
                        className="w-full bg-green-500 text-white py-4 text-xl font-bold uppercase border-4 border-black hover:bg-green-600 active:translate-y-1 transition-transform"
                      >
                        Connect to MetaMask
                      </button>
                    </>
                  )}
                </>
              ) : (
                <button
                  onClick={() => window.open("https://metamask.io/", "_blank")}
                  className="w-full bg-green-500 text-white py-4 text-xl font-bold uppercase border-4 border-black hover:bg-green-600 active:translate-y-1 transition-transform"
                >
                  Install MetaMask
                </button>
              )}
              <div className="text-center text-2xl font-bold">- OR -</div>
              {isLoading ? (
                <div className="text-center text-2xl font-bold">Loading...</div>
              ) : (
                <form onSubmit={handleManualLookup} className="space-y-2">
                  <input
                    type="text"
                    placeholder="ETH address / ENS name"
                    name="addressOrENS"
                    value={ensInput}
                    onChange={(e) => setEnsInput(e.target.value)}
                    className="w-full p-4 text-xl border-4 border-black"
                  />
                  <button className="w-full bg-blue-500 text-white py-4 text-xl font-bold uppercase border-4 border-black hover:bg-blue-600 active:translate-y-1 transition-transform">
                    Fetch ENS Data
                  </button>
                </form>
              )}
              <button
                onClick={closeENSDialog}
                className="w-full bg-gray-300 text-black py-4 text-xl font-bold uppercase border-4 border-black hover:bg-gray-400 active:translate-y-1 transition-transform"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
