// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({

    build: {
        transpile:
        process.env.NODE_ENV === 'production'
            ? [
                'naive-ui',
                'vueuc',
                '@css-render/vue3-ssr',
                '@juggle/resize-observer'
            ]
            : ['@juggle/resize-observer']
    },
    
    css: [
        'assets/css/wiki-styles.css',
        'assets/css/wiki-site-styles.css',
    ],

    meta: {
        title: 'Nuxt3-WindiCSS-NaiveUI Starter',
        link: [
            { rel: 'preconnect', href: 'https://rsms.me' },
            { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
        ],
    },

    modules: [
        'nuxt-windicss',
        '@vueuse/nuxt',
        'nuxt-icon',
        '@pinia/nuxt',
    ],

    vite: {
        optimizeDeps: {
            include:
                process.env.NODE_ENV === 'development'
                    ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
                    : []
        },
    },

})
