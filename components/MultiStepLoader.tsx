import React, { ReactNode, useEffect } from "react";
import useModal from "../store/useModal";
import Arns from "../src/Misc/Arns";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Step {
  title: string;
  content: ReactNode;
}

const steps: Step[] = [
  {
    title: "",
    content: (
      <div className="space-y-4">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-16 w-16 text-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="mt-4 text-lg font-semibold">Uploading Image...</p>
        </div>
      </div>
    ),
  },
  {
    title: "",
    content: (
      <div className="space-y-4">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-16 w-16 text-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="mt-4 text-lg font-semibold">Generating Content...</p>
        </div>
      </div>
    ),
  },
  {
    title: "",
    content: (
      <div className="space-y-4">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-16 w-16 text-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="mt-4 text-lg font-semibold">Uploading Content...</p>
        </div>
      </div>
    ),
  },
  {
    title: "Set ArNS record",
    content: <Arns />,
  },
  {
    title: "",
    content: (
      <div className="space-y-4">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-16 w-16 text-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="mt-4 text-lg font-semibold">Writing on AO...</p>
        </div>
      </div>
    ),
  },
];

export default function MultiStepLoader({ isOpen, onClose }: CustomModalProps) {
  const currentStep = useModal((state) => state.currentStep);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const renderStepContent = (step: Step) => step.content;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-75"></div>
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className="bg-[#d3f99d] w-full max-w-md p-6 rounded-lg shadow-lg relative"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex justify-between mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index === steps.length - 1 ? "" : "flex-1"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full border-2 border-black flex items-center justify-center font-bold ${
                    index <= currentStep
                      ? "bg-black text-[#d3f99d]"
                      : "bg-[#d3f99d] text-black"
                  }`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-1 ${
                      index < currentStep ? "bg-black" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold mb-4">{steps[currentStep].title}</h2>

          <div className="mb-6">{renderStepContent(steps[currentStep])}</div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-black hover:text-gray-700"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
