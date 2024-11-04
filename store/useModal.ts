import { create } from "zustand";

interface State {
  isOpen: boolean;
  onClose: () => void;
  currentStep: number;
  increaseCurrentStep: () => void;
  decreaseCurrentStep: () => void;
}
const useModal = create<State>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  currentStep: 0,
  increaseCurrentStep: () =>
    set((state) => ({ currentStep: state.currentStep + 1 })),
  decreaseCurrentStep: () =>
    set((state) => ({ currentStep: state.currentStep - 1 })),
}));
export default useModal;
