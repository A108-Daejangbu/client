/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        gray: "#888888",
        lightgray: "#BEBEBE",
        gray: '#D9D9D9',
      },
      fontFamily: {
        "pre-black": ["Pretendard-Black", "sans-serif"],
        "pre-extrabold": ["Pretendard-ExtraBold", "sans-serif"],
        "pre-bold": ["Pretendard-Bold", "sans-serif"],
        "pre-semibold": ["Pretendard-SemiBold", "sans-serif"],
        "pre-light": ["Pretendard-Light", "sans-serif"],
        "pre-regular": ["Pretendard-Regular", "sans-serif"],
        "pre-medium": ["Pretendard-Medium", "sans-serif"],
        "pre-thin": ["Pretendard-Thin", "sans-serif"],
        "pre-extralight": ["Pretendard-ExtraLight", "sans-serif"],
      },
      fontSize: {
        8: "8px",
        10: "10px",
        12: "12px",
        16: "16px",
        14: "14px",
        20: "20px",
        24: "24px",
      },
      borderWidth: {
        0.2: "0.2px",
        0.5: "0.5px",
      },
    },
  },
  plugins: [],
};
