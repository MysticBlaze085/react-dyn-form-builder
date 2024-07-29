/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
    presets: ['./preset.js'],
    plugins: [
        // require('@tailwindcss/typography'),
        // require('@tailwindcss/aspect-ratio'),
        plugin(function ({ addBase, addComponents, addUtilities, theme }) {
            addBase({
                h1: {
                    fontSize: theme('fontSize.2xl'),
                },
                h2: {
                    fontSize: theme('fontSize.xl'),
                },
            });
            addComponents({
                '.card': {
                    backgroundColor: theme('colors.white'),
                    borderRadius: theme('borderRadius.lg'),
                    padding: theme('spacing.6'),
                    boxShadow: theme('boxShadow.md'),
                },
            });
            addUtilities({
                '.content-auto': {
                    contentVisibility: 'auto',
                },
            });
        }),
    ],
};
