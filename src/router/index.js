import Vue from 'vue'
import Router from 'vue-router'
import Mymusic from '@/components/mymusic/mymusic'
import Recommend from '@/components/recommend/recommend'
import Discovery from '@/components/discovery/discovery'
import MymusicList from '@/components/mymusicList/mymusicList'
import User from '@/components/user/user'
import Search from '@/components/search/search'
import Singer from '@/components/singer/singer'
import MusicList from '@/components/musicList/musicList'
import Disc from '@/components/disc/disc'
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
      component: Mymusic,
      children: [
        {
          path: '/mymusicList',
          component: MymusicList
        }
      ]
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: '/singer',
          component: Singer,
          children: [
            {
              path: ':id',
              component: MusicList,
            }
          ]
        },
        {
          path: '/disc',
          component: Disc
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
      path: '/discovery',
      component: Discovery
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
