import 'babel-polyfill'
import Fastclick from 'fastclick'
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import App from './App'
import router from './router'
import '@/common/stylus/index.styl'

// 解决 默认点击事件300ms左右的延迟
Fastclick.attach(document.body)
// 阻止vue在启动时生成生产提示
Vue.config.productionTip = false
// 图片懒加载 设置默认显示图片，使用：v-lazy
Vue.use(VueLazyload, {
  loading: require('../static/default.png')
})

//注册全局指令-阻止多次点击
Vue.directive('preventRepeatClick', {
  inserted (el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 3000)
      }
    })
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
