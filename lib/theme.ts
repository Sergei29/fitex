// theme.ts
import { useColorScheme } from '@/hooks/useColorScheme';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { create } from 'twrnc';

// 🎨 Light theme colors
const lightColors = {
  primary: '#2563eb',    // blue-600
  secondary: '#9333ea',  // purple-600
  background: '#f9fafb', // gray-50
  surface: '#ffffff',    // white
  text: '#111827',       // gray-900
};

// 🎨 Dark theme colors
const darkColors = {
  primary: '#60a5fa',    // blue-400
  secondary: '#c084fc',  // purple-400
  background: '#0f172a', // slate-900
  surface: '#1e293b',    // slate-800
  text: '#f1f5f9',       // slate-100
};

// 🌀 Tailwind instances
export const twLight = create({
  theme: {
    extend: {
      colors: {
        primary: lightColors.primary,
        secondary: lightColors.secondary,
        background: lightColors.background,
        surface: lightColors.surface,
        text: lightColors.text,
      },
    },
  },
});

export const twDark = create({
  theme: {
    extend: {
      colors: {
        primary: darkColors.primary,
        secondary: darkColors.secondary,
        background: darkColors.background,
        surface: darkColors.surface,
        text: darkColors.text,
      },
    },
  },
});

// 🖌 Paper themes
export const paperThemeLight = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...lightColors,
  },
};

export const paperThemeDark = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...darkColors,
  },
};

export const useTheme = () => {
  const colorScheme = useColorScheme();
const paperTheme = colorScheme === 'dark' ? paperThemeDark : paperThemeLight

  return {
    paperTheme,
    tw: colorScheme === 'dark' ? twDark : twLight,
  };
};