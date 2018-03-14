// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from './http'
import App from './App'
import iView from 'iview'
import router from './router'
import 'iview/dist/styles/iview.css'
import store from './store'
// import vuei18n from 'vue-i18n'
// import 'vue-xlsx-table/dist/style.css'
import vueXlsxTable from 'vue-xlsx-table'

Vue.use(vueXlsxTable, {rABS: false})
// Vue.use(vuei18n)
var VueTouch = require('vue-touch')

Vue.use(VueTouch, {name: 'v-touch'})

Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.use(iView)

import apolloProvider from './apollo'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  axios,
  router,
  store,
  apolloProvider,
  template: '<App/>',
  components: { App }
})
