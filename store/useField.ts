import { IconType } from "react-icons/lib";
import { create } from "zustand";

interface State {
  name: string;
  description: string;
  image: string;
  social: Array<{
    name: string;
    url: string;
    icon: IconType;
    uuid: string;
    iconName: string;
    className: string;
  }>;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setImage: (image: string) => void;
  insertLink: (social: {
    name: string;
    url: string;
    icon: IconType;
    uuid: string;
    iconName: string;
    className: string;
  }) => void;
  removeLink: (uuid: string) => void;
  changeLinkName: (uuid: string, name: string) => void;
  changeLinkUrl: (uuid: string, url: string) => void;
  getLink: (uuid: string) =>
    | {
        name: string;
        url: string;
        icon: IconType;
      }
    | undefined;
}
const useField = create<State>((set, get) => ({
  name: "",
  description: "",
  image: "",
  social: [],
  setName: (name) => set({ name }),
  setDescription: (description) => set({ description }),
  setImage: (image) => set({ image }),
  insertLink: (social) =>
    set((state) => ({ social: [...state.social, social] })),
  removeLink: (uuid) =>
    set((state) => ({
      social: state.social.filter((link) => link.uuid !== uuid),
    })),
  changeLinkName: (uuid, name) =>
    set((state) => ({
      social: state.social.map((link) =>
        link.uuid === uuid ? { ...link, name } : link
      ),
    })),
  changeLinkUrl: (uuid, url) =>
    set((state) => ({
      social: state.social.map((link) =>
        link.uuid === uuid ? { ...link, url } : link
      ),
    })),
  getLink(uuid) {
    const link = get().social.find((link) => link.uuid === uuid);
    if (!link) {
      return undefined;
    }
    return link;
  },
}));

export default useField;
