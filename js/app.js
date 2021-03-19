import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueClipboard from 'vue-clipboard2'
import '../css/index.sass'
import App from './index'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(VueClipboard)

new Vue(App).$mount('#app')
