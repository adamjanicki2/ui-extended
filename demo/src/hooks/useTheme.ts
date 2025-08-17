import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useEffect } from "react";

export type Theme = "light" | "dark";

export type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const useTheme = create(
  persist<ThemeStore>(
    (set) => ({
      theme: "light",
      setTheme: (theme: Theme) => set({ theme }),
    }),
    {
      name: "ui-extended-theme-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useSetDocumentTheme = () => {
  const { theme } = useTheme();
  useEffect(
    function () {
      document.body.setAttribute("data-theme", theme);
    },
    [theme]
  );
};
