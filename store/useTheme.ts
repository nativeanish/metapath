import { create } from "zustand";
export type theme =
  | "classicLight"
  | "classicDark"
  | "classicBrut"
  | "bentoLight"
  | "bentoDark"
  | "windowLight"
  | "windowDark";
interface State {
  theme: theme | null;
  setTheme: (theme: theme) => void;
}

const useTheme = create<State>((set) => ({
  theme: null,
  setTheme: (theme) => set({ theme }),
}));

export default useTheme;
