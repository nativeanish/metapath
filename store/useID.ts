import { create } from "zustand";

interface State {
  id: string;
  setId: (id: string) => void;
}
const useID = create<State>((set) => ({
  id: "",
  setId: (id: string) => set({ id }),
}));

export default useID;
