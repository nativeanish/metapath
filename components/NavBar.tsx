export default function NavBar({ text }: { text?: string }) {
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
      <button className="hidden sm:block px-4 py-2 border-black rounded-md border-2 bg-[#d3f99d] hover:bg-[#50C878] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] font-bold tracking-widest">
        Connect
      </button>
    </nav>
  );
}
