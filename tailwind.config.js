module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",

    // Add other paths here if you have more directories where you use Tailwind classes
  ],
  // Add any custom configurations here
  theme: {
    extend: {},
  },
  plugins: [],
  // corePlugins: {
  //   preflight: false,
  // },
};
