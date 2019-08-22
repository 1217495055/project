import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入第三方的组件库 mint ui
// 1 完整引入mint ui 组件库中的所有组件
import MintUI from 'mint-ui'
// 2 单独引入mint ui 组件库中的样式文件
import 'mint-ui/lib/style.css'
// 3 将 mint ui 注册到Vue 实例中
Vue.use(MintUI)
// 4 将字体图标引入到项目中
import '@/font/iconfont.css'
// 引入axios模块
import axios from 'axios'
Vue.prototype.axios = axios;
// 全局设置post时候，表单数据格式的组织形式
Vue.axios.option.emulateJson=true;

// 导入时间模块
import moment from 'moment'

// 安装图片预览插件
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)

// 注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 每次刚进网站调用main.js把本地存储中的数据读取出来
var car = JSON.parse(localStorage.getItem('car')||'[]')

var store = new Vue.store({
  state:{
    car :car   //将购物车中商品的数据，用一个数组存储起来{id:商品id,count:购买的数量,price:商品的单价,selected：false}
  },
  mutations:{
    addToCar(state,goodsinfo){
      // 点击加入购物车，把商品信息保存到state中的car上
      // (1)如果购物车中，之前就有对应的商品了，就只需要更新数量
      // （2）如果没有，则直接把商品数据，push到car中
      // 假设在购物车中没有找到对应的商品
      var flag = false;
      state.car.some(item=>{
        if(item.id==goodsinfo.id){
          item.count += parseInt(goodsinfo.count);
          flag=true;
          return true;
        }
        // 最终循环完毕，得到的是false,则把商品数据直接push到数组中
        if(!flag){
          state.car.push(goodsinfo);
        } 
        localStorage.setItem('car',JSON.stringify(state.car))
      })
    },
    updataGoodsInfo(state,goodsinfo){
      // 修改购物车中商品的数量值
      state.car.some(item=>{
        if(item.id==goodsinfo.id){
          item.count=parseInt(goodsinfo.count);
          return true;
        }
      })
      // 当修改完商品的数量把最新的购物车数据保存到本地存储中
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    removeFormCar(state,id){
      // 根据ID，从store中的购物车中国删除对应的那条商品数据
      state.car.some(item=>{
        if(item.id==id){
          state.car.splice(i,1);
          return true;
        }
      })
      // 将删除完毕后的最新购物车数据同步到本地存储中
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateGoodsSelected(state,info){
      state.car.some(item=>{
        if(item.id==info.id){
          item.selected=info.selected;
        }
      })
      // 把最新的所有购物车的商品状态保存到store中去
      localStorage.setItem('car',JSON.stringify(state.car))
    },
  },
  getter:{
    // 相当于计算属性，也相当于filters
    getAllCount(state){
      var c = 0;
      state.car.forEach(item=>{
        c += item.count;
      })
      return c;
    },
    getGoodsSelected(state){
      var o = [];
      state.car.forEach(item=>{
        o[item.id] = item.selected;
      })
      return o;
    },
  }
})

Vue.config.productionTip = false




// 定义全局过滤器
Vue.filter('dataFormat',function(dataStr,pattern = "YYYY-MM-DD HH:mm:ss"){
  return moment(dataStr).format(pattern)
})


new Vue({
  //挂载路由对象
  router,
  render: h => h(App),
  store,  // 挂载store状态管理对象
}).$mount('#app')
