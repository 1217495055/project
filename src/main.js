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


Vue.config.productionTip = false


// 定义全局过滤器
Vue.filter('dataFormat',function(dataStr,pattern = "YYYY-MM-DD HH:mm:ss"){
  return moment(dataStr).format(pattern)
})


new Vue({
  //挂载路由对象
  router,
  render: h => h(App)
}).$mount('#app')
