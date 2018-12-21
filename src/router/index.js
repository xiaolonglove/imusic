import Vue from 'vue'
import Router from 'vue-router'
import Mymusic from '@/components/mymusic/mymusic'
import Recommend from '@/components/recommend/recommend'
import Rank from '@/components/rank/rank'
import User from '@/components/user/user'
import Search from '@/components/search/search'
import Singer from '@/components/singer/singer'
import Musiclist from '@/components/musiclist/musiclist'
import Radio from '@/components/radio/radio'
import Top from '@/components/top/top'
import NewSong from '@/components/newSong/newSong'

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
      children: [
        {
          path: '/singer',
          component: Singer
        },
        {
          path: '/musiclist',
          component: Musiclist
        },
        {
          path: '/radio',
          component: Radio
        },
        {
          path: '/top',
          component: Top
        },
        {
          path: '/newsong',
          component: NewSong
        },
      ]
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
