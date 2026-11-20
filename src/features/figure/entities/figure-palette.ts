export type FigureTheme = "light" | "dark";

export type FigurePalette = {
  skin: string;
  skinShadow: string;
  hair: string;
  feature: string;
  lip: string;
  mouth: string;
  teeth: string;
  top: string;
  seaGlass: string;
  rimLight: string;
  keyLight: string;
  skyLight: string;
  groundLight: string;
};

export const figurePalettes: Record<FigureTheme, FigurePalette> = {
  light: {
    skin: "#b9835f",
    skinShadow: "#9a6342",
    hair: "#17130f",
    feature: "#1d140f",
    lip: "#a95d4f",
    mouth: "#2a1210",
    teeth: "#f6f2ea",
    top: "#1e2a4a",
    seaGlass: "#7fcf9f",
    rimLight: "#2e8b57",
    keyLight: "#fff3e6",
    skyLight: "#ffffff",
    groundLight: "#cfe8d9",
  },
  dark: {
    skin: "#b9835f",
    skinShadow: "#8a5638",
    hair: "#2b231d",
    feature: "#1d140f",
    lip: "#a95d4f",
    mouth: "#2a1210",
    teeth: "#f6f2ea",
    top: "#22305a",
    seaGlass: "#5fc98f",
    rimLight: "#5fc98f",
    keyLight: "#ffe9d2",
    skyLight: "#c9d6ff",
    groundLight: "#0e1512",
  },
};
