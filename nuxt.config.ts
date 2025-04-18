// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  ssr: true,

  css: [
    '@fancyapps/ui/dist/fancybox/fancybox.css',
    '~/assets/style.scss',
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/fontawesome/css/fontawesome.css',
    '~/assets/fontawesome/css/solid.css',
    '~/assets/fontawesome/css/brands.css',
    '~/assets/fontawesome/css/regular.css',
  ],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'og:type', content: 'website' },
        { name: 'og:url', content: '/' },
        { name: 'og:image', content: '/og.png' },
        { name: 'og:locale', content: 'ru_RU' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },

      ],
      htmlAttrs: {
        lang: 'ru'
      },

      // noscript: [
      //   { children: `<div><img src="https://mc.yandex.ru/watch/97690479" style="position:absolute; left:-9999px;" alt="" /></div>` }
      // ],

      script: [
        {
          innerHTML: `window.dataLayer = window.dataLayer || [];`,
          type: 'text/javascript',
        }
      ]
    },
    rootId: '__hostauto',
  },

  modules: [
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "vue3-carousel-nuxt",
    'vue3-carousel-nuxt',
    '@vueuse/nuxt',
    'yandex-metrika-module-nuxt3',
    "@nuxt/content",
    "@nuxt/image",
    "@nuxt/eslint",
  ],

  eslint: {
  },


  // yandexMetrika: {
  //   id: '97690479',
  //   clickmap: true,
  //   trackLinks: true,
  //   accurateTrackBounce: true,
  //   webvisor: true,
  //   ecommerce: true,

  // },

  pinia: {
    storesDirs: ['./stores/**']
  },
})