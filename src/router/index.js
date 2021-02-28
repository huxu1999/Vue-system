import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import users from '../components/user/users.vue'
import putIn from '../components/informationEntry/putIn.vue'
import putOut from '../components/informationEntry/putOut.vue'
import dataVis from '../components/stockInquiry/dataVis.vue'
import queryData from '../components/stockInquiry/queryData.vue'
Vue.use(Router)

export default new Router({
  routes: [
   {
     path:'/login',
     component:Login
   },
   {
     path:'/',
     redirect:'/login'
   },
   
   {path:'/home',component:Home,redirect:'/welcome',
    children:[
      {path:'/welcome',component:Welcome},
      {path:'/user',component:users},
      {path:'/putIn',component:putIn},
      {path:'/putOut',component:putOut},
      {path:'/dataVis',component:dataVis},
      {path:'/queryData',component:queryData}
    ]   
   }
  ]
})
