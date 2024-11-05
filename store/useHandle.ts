import { create } from "zustand";

interface State {
  subdomain: string;
  setSubdomain: (subdomain: string) => void;
}
const useHandle = create<State>((set) => ({
  subdomain: "",
  setSubdomain: (subdomain: string) => set({ subdomain }),
}));

export default useHandle;
