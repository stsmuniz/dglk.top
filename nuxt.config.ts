// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    modules: [
      'nuxt-mongoose',
      '@nuxt/ui',
      '@pinia/nuxt',
      '@pinia-plugin-persistedstate/nuxt',
    ],
    mongoose: {
        uri: process.env.NUXT_MONGODB_URI,
        options: {},
        modelsDir: 'models',
        devtools: true,
    },
    piniaPersistedstate: {
        storage: process.client ? window.localStorage : undefined
    },
    runtimeConfig: {
        public: {
            appUrl: '',
        },
        mongodb_uri: '',
        ipinfoToken: '',
        jwtSecret: '',
        resendApiKey: '',
        resendFrom: '',
        resendUrl: '',
    }
})