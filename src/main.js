// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store/index'
import './mork/index'
import { Tabbar,TabItem,Swipe, SwipeItem,Badge,Toast,MessageBox,Navbar,TabContainer,TabContainerItem,DatetimePicker,Radio,Button } from 'mint-ui';
import lazyLoad from "vue-lazyload"
import 'mint-ui/lib/style.css'
import mui from '../static/js/mui.js'
Vue.prototype.$mui = mui;

// //懒加载
Vue.use(lazyLoad,{
  loading:require('../static/index/timg.jpg')
})
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Badge.name, Badge);
Vue.component(Navbar.name, Navbar);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Radio.name, Radio);
Vue.component(Button .name, Button );
Vue.$toast = Vue.prototype.$toast = Toast;
Vue.$messageBox = Vue.prototype.$messageBox  = MessageBox;
Vue.config.productionTip = false

Vue.use(Vuex)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
