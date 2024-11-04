import { ArrowRight } from "lucide-react";
import useAddress from "../../store/useAddress";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
export default function Home() {
  const address = useAddress((state) => state.address);
  const navigate = useNavigate();
  useEffect(() => {
    if (address?.length && address) {
      navigate("/onboard");
    }
  }, [address]);
  return (
    <div className="min-h-screen bg-yellow-300 text-black font-mono">
      <NavBar />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-none">
          Your Links,
          <br />
          Your Way,
          <br />
          Permanent
        </h1>
        <p className="text-2xl md:text-3xl mb-12 max-w-2xl">
          Create a personalized link hub powered by blockchain. Take control of
          your online presence.
        </p>
        <a
          href="#"
          className="inline-flex items-center px-8 py-4 bg-black text-yellow-300 text-2xl font-bold hover:bg-yellow-300 hover:text-black border-4 border-black transition-colors"
        >
          Get Started
          <ArrowRight className="ml-2 h-8 w-8" />
        </a>
      </main>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-12">Why DecentralTree?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Decentralized",
              description:
                "Your data, your control. No central authority can limit your access.",
            },
            {
              title: "Customizable",
              description:
                "Design your link page to match your personal brand and style.",
            },
            {
              title: "Secure",
              description:
                "Blockchain-backed security ensures your data remains safe and tamper-proof.",
            },
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 border-4 border-black">
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-xl">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-black text-yellow-300 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <p className="text-xl mb-4 md:mb-0">
              &copy; 2023 DecentralTree. All rights reserved.
            </p>
            <nav>
              <ul className="flex space-x-6 text-xl">
                <li>
                  {/* <Link href="/privacy" className="hover:underline">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:underline">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline">
                    Contact
                  </Link> */}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
