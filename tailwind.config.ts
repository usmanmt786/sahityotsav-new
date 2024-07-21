import type { Config } from "tailwindcss";
import APPCONFIGS from "./configs";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
   extend:{
    colors:{
      primary: APPCONFIGS.style.primaryColor
     }
   }
  },
  plugins: [],
};
export default config;
