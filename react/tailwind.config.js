/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html" ,"./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        margin: {
            "bigMarginLeft": "432px",
            "lgMargin": "510px",
            "sMargin": "200px"
        },
        width: {
            "smallWidth": "180px",
            "bigWidth": "320px",
            "midWidth": "352px"
        },
        bottom: {
            "bigBottom": "485px"
        }

    },
  },
  plugins: [],
}
