import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './styles/global.css'
import ApiService from './services/ApiService'
Vue.use(BootstrapVue)

Vue.config.productionTip = false
Vue.prototype.$http = ApiService
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
