import Vue from 'vue'
import Router from 'vue-router'
import Mymusic from '@/components/mymusic/mymusic'
import Recommend from '@/components/recommend/recommend'
import Rank from '@/components/rank/rank'
import User from '@/components/user/user'
import Search from '@/components/search/search'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/mymusic'
    },
    {
      path: '/mymusic',
      component: Mymusic
    },
    {
      path: '/recommend',
      component: Recommend,
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/user',
      component: User
    },
    {
      path: '/search',
      component: Search
    },
  ]
})
