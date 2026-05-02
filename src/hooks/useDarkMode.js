import { useEffect, useState } from "react";

const THEMES = {
  light: {
    bg: "#ffffff",
    text: "#000000",
    card: "#f2f2f2",
    accent: "#2d6cdf",
  },
  dark: {
    bg: "#0f0f0f",
    text: "#ffffff",
    card: "#1a1a1a",
    accent: "#70d79d",
  },
  military: {
    bg: "#0b1f14",
    text: "#d6f5e3",
    card: "#123524",
    accent: "#00c27a",
  },
};

export default function useTheme() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);

    const t = THEMES[theme];

    document.body.style.background = t.bg;
    document.body.style.color = t.text;
    document.body.style.transition = "all 0.3s ease";
  }, [theme]);

  return {
    theme,
    setTheme,
    colors: THEMES[theme],
  };
}