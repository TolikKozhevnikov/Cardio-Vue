import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import { BootstrapVue } from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

Vue.config.productionTip = false

import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios,axios);


new Vue({
  router,
  vuetify,
  axios,
  render: h => h(App)
}).$mount('#app')
