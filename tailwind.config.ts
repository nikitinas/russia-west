import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        trunk: {
          1: "rgb(59 130 246)",
          2: "rgb(34 197 94)",
          3: "rgb(168 85 247)",
          4: "rgb(239 68 68)",
          5: "rgb(234 88 12)",
          6: "rgb(20 184 166)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
