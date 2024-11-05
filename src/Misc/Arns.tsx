import { useEffect, useState } from "react";
import useID from "../../store/useID";
import useHandle from "../../store/useHandle";
import runAO from "../../utils/aos/script";

function Arns() {
  const name = useHandle((state) => state.subdomain);
  const setName = useHandle((state) => state.setSubdomain);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isValid, setvalid] = useState(true);
  useEffect(() => {
    setvalid(isAlphaNumeric(name));
    if (!isValid && name.length) {
      setError("Please use Alphanumeric only");
    } else {
      setError("");
    }
  }, [name, isValid]);
  const id = useID((state) => state.id);
  const show = () => {
    if (name.length) {
      fetch("https://metapaths-server.onrender.com/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subdomain: name,
        }),
      }).then((e) => {
        e.json().then((res: { status: 1 | 0 }) => {
          if (res.status === 1) {
            setError("Pre Registered, Register with other Name");
          } else {
            setLoading(true);
            fetch("https://metapaths-server.onrender.com/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id,
                subdomain: name,
              }),
            }).then((res) => {
              res.json().then((res) => {
                if (res.status === 1) {
                  runAO();
                } else {
                  setError("Something went wrong, Please re register");
                  setLoading(false);
                }
              });
            });
          }
        });
      });
    } else {
      setError("ReCheck your input");
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
                Registering Handle...
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <AnimateInput
            label="Enter Your Subdomain"
            type="text"
            animationTexts={[
              "_metapaths.permagate.io",
              "_metapaths.ar-io.dev",
              "_metapaths.g8way.io",
              "_metapaths.arweave.net",
            ]}
            value={name}
            setValue={setName}
          />
          <button
            className={`w-full ${
              isValid ? "bg-black" : "bg-gray-300"
            } text-white p-2 rounded-md font-mono text-md`}
            onClick={show}
            disabled={!isValid}
          >
            Register
          </button>
          {error && error.length ? (
            <p className="text-center text-red-500 font-bold">{error}</p>
          ) : null}
        </div>
      )}
    </>
  );
}

export default Arns;
function isAlphaNumeric(input: string): boolean {
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(input);
}

function AnimateInput({
  label = "Username",
  type = "text",
  animationTexts = ["_metapaths.permagate.io"],
  value,
  setValue,
}: {
  label?: string;
  type?: string;
  animationTexts?: string[];
  setValue: (value: string) => void;
  value: string;
}) {
  const [animatedText, setAnimatedText] = useState("_metapaths.permagate.io");
  const isValid = isAlphaNumeric(value);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimatedText((prevText: string) => {
        const currentIndex = animationTexts.indexOf(prevText);
        const nextIndex = (currentIndex + 1) % animationTexts.length;
        return animationTexts[nextIndex];
      });
    }, 2000); // Change text every 2 seconds

    return () => clearInterval(intervalId);
  }, [animationTexts]);

  return (
    <div className="mb-4 max-w-2xl">
      <label
        className="block text-sm font-bold mb-2 text-gray-700"
        htmlFor={label}
      >
        {label}
      </label>
      <div className="flex rounded-md overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.1)] transition-shadow duration-300 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)]">
        <input
          className={`w-2/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none border-t border-b border-l border-gray-300 rounded-l-md ${
            value ? (isValid ? "border-green-500" : "border-red-500") : ""
          }`}
          id={label}
          type={type}
          placeholder={label}
          aria-label={label}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div
          className="w-2/3 px-3 bg-gradient-to-r from-gray-100 to-gray-200 py-2 text-gray-700 leading-tight whitespace-nowrap border-t border-b border-r border-gray-300 rounded-r-md overflow-hidden"
          aria-hidden="true"
        >
          <span className="inline-block min-w-[400px] text-left font-medium animate-slide">
            {animatedText}
          </span>
        </div>
      </div>
      {value && (
        <p
          className={`mt-1 text-sm ${
            isValid ? "text-green-600" : "text-red-600"
          }`}
        >
          {/* {isValid ? "Valid input" : "Input must be alphanumeric"} */}
        </p>
      )}
    </div>
  );
}
