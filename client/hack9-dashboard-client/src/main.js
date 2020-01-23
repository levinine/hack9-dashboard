import Vue from 'vue'
import App from './App.vue'
import router from '../router'
import * as VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/black-green-dark.css'
import './theme.scss'
import Router from 'vue-router'

Vue.config.productionTip = false
Vue.use(VueMaterial.default)
Vue.use(Router)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

