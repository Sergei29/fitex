import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

import { paperThemeDark, paperThemeLight, twDark, twLight } from "@/lib/theme";

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
  tw: typeof twLight;
  theme: typeof paperThemeLight;
};

const STORAGE_KEY = "@user-theme-preference";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const colorScheme = Appearance.getColorScheme(); // 'light' | 'dark' | null
  const [isDark, setIsDark] = useState(colorScheme === "dark");

  // Load user preference on mount
  useEffect(() => {
    (async () => {
      const storedTheme = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTheme === "light") setIsDark(false);
      else if (storedTheme === "dark") setIsDark(true);
      else setIsDark(colorScheme === "dark"); // fallback to system theme
    })();
  }, [colorScheme]);

  // Save preference on change
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const theme = isDark ? paperThemeDark : paperThemeLight;
  const tw = isDark ? twDark : twLight;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, tw, theme }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook for consuming theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
