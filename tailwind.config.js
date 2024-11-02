/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./skeleton/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  safelist: [
    {
      pattern: /^(bg|text)-(\[#(?:[0-9a-fA-F]{3}){1,2}\]|[a-z]+(-[a-z\d]+)*)/,
      variants: ["hover", "focus", "active", "border"],
    },
  ],
  plugins: [
    ({ addBase, theme }) => {
      addBase({
        ":root": Object.fromEntries(
          Object.entries(theme("colors")).flatMap(([colorName, colorValue]) =>
            typeof colorValue === "object"
              ? Object.entries(colorValue).map(([shade, value]) => [
                  `--color-${colorName}-${shade}`,
                  value,
                ])
              : [[`--color-${colorName}`, colorValue]]
          )
        ),
      });
    },
  ],
};
