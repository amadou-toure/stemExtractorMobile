import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  sunsetJazzTheme,
  neonPulseTheme,
  deepOceanTheme,
  velvetNightTheme,
  midnightSapphireTheme,
} from "../src/style/global.style";

interface ThemeStems {
  PrimaryColor: string;
  SecondaryColor: string;
  TextColor: string;
  bgColor: string;
  [key: string]: string;
}

interface SelectedThemeContextType {
  selectedTheme: ThemeStems;
  setSelectedTheme: React.Dispatch<React.SetStateAction<ThemeStems>>;
  themes: { [key: string]: ThemeStems };
}

const themes = {
  sunsetJazzTheme,
  neonPulseTheme,
  deepOceanTheme,
  velvetNightTheme,
  midnightSapphireTheme,
};

const SelectedThemeContext = createContext<SelectedThemeContextType>({
  selectedTheme: velvetNightTheme,
  setSelectedTheme: () => {},
  themes,
});

export const SelectedThemeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeStems>(
    sunsetJazzTheme // 👈
  );

  return (
    <SelectedThemeContext.Provider
      value={{
        selectedTheme,
        setSelectedTheme,
        themes,
      }}
    >
      {children}
    </SelectedThemeContext.Provider>
  );
};

export const useSelectedTheme = (): SelectedThemeContextType => {
  const context = useContext(SelectedThemeContext);
  if (!context) {
    throw new Error(
      "useSelectedTheme must be used within a SelectedThemeProvider"
    );
  }
  return context;
};
