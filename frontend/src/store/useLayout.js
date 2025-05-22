import { create } from "zustand";

export const useLayoutStore = create((set) => ({
  isIconSidebarHide: true,
  IconSidebarToggle: () => {
    set((state) => ({ isIconSidebarHide: !state.isIconSidebarHide }));
  },
}));
