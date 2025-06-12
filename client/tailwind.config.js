export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    screens: {
      xxs:'325px',
      xs: '475px',
      sm: '640px',   // Small devices (landscape phones)
      md: '768px',   // Medium devices (tablets)
      lg: '1024px',  // Large devices (desktops)
      xl: '1280px',  // Extra large devices
      '2xl': '1536px', // 2x Extra large screens
    },
  },
  plugins: [],
};
