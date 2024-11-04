import { useEffect, useState } from "react";
import Register from "../../utils/arns";
import useModal from "../../store/useModal";

function Arns() {
  const [processId, setProcessId] = useState("");
  const [name, setName] = useState("@");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setModal = useModal((stae) => stae.onClose);
  const show = () => {
    if (name.length && processId.length) {
      setLoading(true);
      Register(processId, name).then((res) => {
        if (res === false) {
          setError(
            "Something went wrong, Please Check subdomain and Process ID"
          );
          setLoading(false);
        }
        if (res && res.length) {
          setModal();
          setLoading(false);
        }
      });
    } else {
      setError("Something went wrong, Please Check subdomain and Process ID");
    }
  };
  return (
    <>
      {loading ? (
        <>
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
              <p className="mt-4 text-lg font-semibold">
                Registering on ARNS...
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <CustomInput
            label="Process ID"
            type="text"
            value={processId}
            setvalue={setProcessId}
          />
          <AnimateInput
            label="Enter Your Subdomain"
            type="text"
            animationTexts={[
              ".permagate.io",
              ".ar-io.dev",
              ".g8way.io",
              ".arweave.net",
            ]}
            value={name}
            setvalue={setName}
          />
          <button
            className="w-full bg-black text-white p-2 rounded-md font-mono text-md"
            onClick={show}
          >
            Register
          </button>
          {error && error.length ? (
            <p className="text-center text-red-500 font-bold">
              Error Something went wrong
            </p>
          ) : null}
        </div>
      )}
    </>
  );
}

export default Arns;
const CustomInput: React.FC<{
  label: string;
  type: string;
  value: string;
  setvalue: React.Dispatch<React.SetStateAction<string>>;
}> = ({ label, type, value, setvalue }) => (
  <div className="mb-4">
    <label className="block text-sm font-bold mb-2" htmlFor={label}>
      {label}
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id={label}
      type={type}
      placeholder={label}
      value={value}
      onChange={(e) => setvalue(e.target.value)}
    />
  </div>
);

function AnimateInput({
  label = "Username",
  type = "text",
  animationTexts = [],
  value,
  setvalue,
}: {
  label?: string;
  type?: string;
  animationTexts?: string[];
  setvalue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}) {
  const [animatedText, setAnimatedText] = useState("metapaths");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimatedText((prevText: string) => {
        const currentIndex = animationTexts.indexOf(prevText);
        const nextIndex = (currentIndex + 1) % animationTexts.length;
        return animationTexts[nextIndex];
      });
    }, 2000); // Change text every 2 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="mb-4">
      <label
        className="block text-sm font-bold mb-2 text-gray-700"
        htmlFor={label}
      >
        {label}
      </label>
      <div className="flex rounded-md overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.1)] transition-shadow duration-300 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)]">
        <input
          className="flex-1 py-2 px-3 text-gray-700 leading-tight focus:outline-none border-t border-b border-l border-gray-300 rounded-l-md"
          id={label}
          type={type}
          placeholder={label}
          aria-label={label}
          value={value}
          onChange={(e) => setvalue(e.target.value)}
        />
        <div
          className="bg-gradient-to-r from-gray-100 to-gray-200 py-2 px-3 text-gray-700 leading-tight whitespace-nowrap overflow-hidden border-t border-b border-r border-gray-300 rounded-r-md"
          aria-hidden="true"
        >
          <span className="inline-block min-w-[60px] text-center font-medium">
            {animatedText}
          </span>
        </div>
      </div>
    </div>
  );
}
