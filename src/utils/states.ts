import { atom } from "recoil";

export const menuAtom = atom({
  key: "menuAtom",
  default: 1,
});

export const loadingAtom = atom({
  key: "loading",
  default: false,
});
