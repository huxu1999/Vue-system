
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import './assets/font_fw0z4mtnpht/iconfont.css'
import axios from 'axios'
import {Message} from 'element-ui'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(ElementUI)
//.defaults.baseURL='http://localhost:3000/#/'//配置请求地址
Vue.prototype.$axios=axios
Vue.prototype.$message=Message
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'  
})
