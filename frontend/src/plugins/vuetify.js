import Vue from 'vue'
import Vuetify from 'vuetify'
import ja from 'vuetify/es5/locale/ja'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  lang: {
    locales: { ja },
    current: 'ja',
  },
  theme: {
    themes: {
      light: {
        // secondary: '#3b434a',
      },
    },
  },
})
