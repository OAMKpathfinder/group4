export default {
  mode: 'universal',
  server: {
    port: 8000, // default: 3000
    host: 'localhost', // default: localhost,
    timing: false
  },
  head: {
    title: process.env.npm_package_name || 'Development',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'prefetch',
        as: 'style',
        href:
          'https://fonts.googleapis.com/css?family=Rubik:300,400,500,700&display=swap'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Rubik:300,400,500,700&display=swap'
      },
      {
        rel: 'stylesheet',
        href:
          'https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.1.0/css/line-awesome.min.css'
      }
    ]
  },
  router: {
    linkExactActiveClass: 'active-link'
  },
  loading: { color: '#fff' },
  css: ['~/assets/css/tailwind.css'],
  plugins: [],
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss'],
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', '@nuxtjs/proxy'],
  proxy: {
    '/api/static': {
      target: 'http://localhost:3000',
      pathRewrite: {
        '^/api/static': '/static'
      }
    }
  },
  axios: {
    host: 'localhost',
    port: '3000',
    prefix: '/api',
    proxy: false,
    retry: { retries: 3 }
  },
  build: {
    extend(config, ctx) {}
  }
}
