import { defineConfig } from 'windicss/helpers'
import defaultTheme from 'windicss/defaultTheme';

export default defineConfig({
    darkMode: 'class',
    attributify: true,
    plugins: [
        require('windicss/plugin/typography'),
        require('@windicss/plugin-scrollbar'),
    ],
    theme: {
        fontFamily: {
            ...defaultTheme.fontFamily,
            'sans': ['Inter', ...defaultTheme.fontFamily.sans],
        },
    },
})
