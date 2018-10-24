// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import Mint_UI from 'mint-ui'
import 'mint-ui/lib/style.css'
import store from './store/index'
import './mork/index'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Mint_UI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
