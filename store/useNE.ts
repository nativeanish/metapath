import { create } from "zustand";

interface State {
  name: string;
  url: string;
  setName: (name: string) => void;
  setUrl: (url: string) => void;
}
const useNE = create<State>((set) => ({
  name: "",
  url: "",
  setName: (name: string) => set({ name }),
  setUrl: (url: string) => set({ url }),
}));
export default useNE;
