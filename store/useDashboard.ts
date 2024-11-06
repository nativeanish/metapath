import { create } from "zustand";

interface State {
  post: Array<string>;
  setPost: (post: Array<string>) => void;
  view: Array<{ handler: string; view: string }>;
  setView: (view: { handler: string; view: string }) => void;
  click: Array<{ name: string; time: string }>;
  clearClick: () => void;
}
const useDashboard = create<State>((set, get) => ({
  post: [],
  setPost: (post: Array<string>) => set({ post }),
  view: [],
  setView: (view: { handler: string; view: string }) =>
    set({ view: [...get().view, view] }),
  click: [],
  clearClick: () => set({ click: [] }),
}));

export default useDashboard;
