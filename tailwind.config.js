export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "exact-1024": "1024px", // يحدد فقط 1024px بدون التأثير على الأكبر
        ipad: { max: "1025px" },
        "max-sm": { max: "639px" },
      },
      colors: {
        primary: "#5F6FFF",
        secondary: "#EAEFFF",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
          xl: "3rem",
          "2xl": "1rem",
        },
      },
    },
  },
  plugins: [],
};
