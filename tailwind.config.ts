import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        achko: {
          primary: "#2563EB",
          secondary: "#7C3AED",
          dark: "#0F172A",
          background: "#F8FAFC",
          accent: "#06B6D4",
        },
      },
      borderRadius: {
        achko: "16px",
      },
      boxShadow: {
        achko: "0 8px 30px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
