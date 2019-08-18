import Vue from 'vue'
import Router from 'vue-router'

import HomeContainer from './components/tabbar/homecontainer'
import MemberContainer from './components/tabbar/membercontainer'
import ShopContainer from './components/tabbar/shopcontainer'
import SearchContainer from './components/tabbar/searchcontainer'
import NewsList from './components/news/newslist'
import NewsInfo from './components/news/newsinfo'
import photolist from './components/photos/photolist'
import photoinfo from './components/photos/photoinfo'
import goodslist from './components/goods/goodslist'
import goodsinfo from './components/goods/goodsinfo'
// 1 在 router.js 引入组件
import Index from "@/components/exam/index"
// import VueRouter from 'vue-router';

Vue.use(Router)
// 2 为组件指定访问的路径  /Exam01
export default new Router({
  routes: [
    {path:'/',redirect:'/home'},
    {path:'/home',component:HomeContainer},
    {path:'/member',component:MemberContainer},
    {path:'/shopcar',component:ShopContainer},
    {path:'/search',component:SearchContainer},
    {path:'/home/newlist',component:NewsList},
    {path:'/home/newsinfo/:id',component:NewsInfo,props:true},
    {path:'/home/photolist',component:photolist},
    {path:'/home/photoinfo/:id',component:photoinfo,props:true},
    {path:'/home/goodslist',component:goodslist},
    {path:'/home/goodsinfo/:id',component:goodsinfo,props:true,name='goodsinfo'},
  ],
  linkActiveClass:'mui-active'
})










