import Vue from 'vue'
import App from '@/app/App'
import vuetify from '@/plugins/vuetify'
import * as veeValidate from '@/plugins/veeValidate'
import router from '@/app/router'
import utils from '@/mixins/utils'
import store from '@/app/store'

require('@/app/assets/scss/main.scss')

Vue.mixin(utils)
Vue.prototype.$const = window
Vue.config.productionTip = false

new Vue({
  vuetify,
  veeValidate,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
