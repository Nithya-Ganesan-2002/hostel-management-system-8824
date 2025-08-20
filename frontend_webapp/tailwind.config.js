/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#64748b",
        accent: "#22d3ee",
      },
      borderRadius: {
        xl: "12px",
      },
    },
  },
  plugins: [],
};
