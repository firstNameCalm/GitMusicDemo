import Vue from 'vue'
import App from './App.vue'
import '@/mobile/flexible'
import '@/styles/reset.css'
import router from './router'

//测试封装的api方法
import {recommendMusicApI} from '@/api'
async function fn(){
  const res = await recommendMusicApI()
  console.log(res);
}
fn()
// 全局注册组件用法
import { Tabbar, TabbarItem, NavBar, Col, Row, Cell, Image as VanImage, Icon,Search,List } from 'vant';
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Col);
Vue.use(Row);
Vue.use(VanImage);
Vue.use(Cell);
Vue.use(Icon);
Vue.use(Search);
Vue.use(List);
// 全局注册组件用法
Vue.config.productionTip = false

// vant组件库自动适配rem 
// 下载postcss postcss-pxtorem


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
