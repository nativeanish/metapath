import { useEffect, useState } from "react";
import { FaLink, FaDatabase, FaLock } from "react-icons/fa";
import { IoMdArrowForward } from "react-icons/io";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import useAddress from "../../store/useAddress";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";

export default function OnBoard() {
  const [step, setStep] = useState(0);
  const address = useAddress((state) => state.address);
  const navigate = useNavigate();
  useEffect(() => {
    if (!address || !address?.length) {
      navigate("/");
    }
  }, [address]);
  const steps = [
    {
      title: "Welcome to Metapaths",
      description:
        "Your decentralized link hub powered by Arweave permanent storage.",
      icon: <FaLink className="w-24 h-24 mb-6" />,
      color: "bg-blue-500",
    },
    {
      title: "Permanent Storage",
      description:
        "Your data is stored on the Arweave blockchain, ensuring it lasts forever.",
      icon: <FaDatabase className="w-24 h-24 mb-6" />,
      color: "bg-green-500",
    },
    {
      title: "Decentralized Control",
      description:
        "You have full control over your data. No central authority can censor or remove your content.",
      icon: <FaLock className="w-24 h-24 mb-6" />,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-black font-mono">
      <NavBar />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white border-8 border-black shadow-[16px_16px_0_0_rgba(0,0,0,1)] p-8 mb-12">
          <div className="text-center mb-12">
            <div
              className={`inline-block p-8 rounded-full ${steps[step].color} border-8 border-black mb-6`}
            >
              {steps[step].icon}
            </div>
            <h2 className="text-5xl font-bold mb-6">{steps[step].title}</h2>
            <p className="text-2xl max-w-2xl mx-auto">
              {steps[step].description}
            </p>
          </div>

          <div className="flex justify-between items-center mt-12">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              className="px-6 py-3 bg-black text-white text-xl font-bold hover:bg-white hover:text-black border-4 border-black transition-colors flex items-center"
              disabled={step === 0}
            >
              <MdChevronLeft className="mr-2 h-6 w-6" /> Previous
            </button>
            <div className="text-3xl font-bold">
              Step {step + 1} of {steps.length}
            </div>
            <button
              onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
              className="px-6 py-3 bg-black text-white text-xl font-bold hover:bg-white hover:text-black border-4 border-black transition-colors flex items-center"
              disabled={step === steps.length - 1}
            >
              Next <MdChevronRight className="ml-2 h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate("/ens")}
            className="px-12 py-6 bg-yellow-400 text-black text-3xl font-bold hover:bg-black hover:text-yellow-400 border-8 border-black transition-colors inline-flex items-center shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:shadow-none"
          >
            Get Started <IoMdArrowForward className="ml-4 h-8 w-8" />
          </button>
        </div>
      </main>
    </div>
  );
}
