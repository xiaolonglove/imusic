<template>
  <div class="mymusic">
    <i-scroll class="mymusic-scroll" ref="mymusic" :data="data">
      <div>
        <div class="tab-wrapper">
          <router-link tag="div" class="tab-item" to="/musiclist">
            <i class="icon-music-notes"></i>
            <span>本地音乐</span>
          </router-link>
          <router-link tag="div" class="tab-item" to="/musiclist" @click="selectTab(1)">
            <i class="icon-heart"></i>
            <span>收藏音乐</span>
          </router-link>
          <router-link tag="div" class="tab-item" to="/musiclist" @click="selectTab(2)">
            <i class="icon-chart-pie"></i>
            <span>最近播放</span>
          </router-link>
        </div>
        <div class="wrapper musiclistFavorite">
          <h1 class="title">收藏歌单</h1>
          <ul class="list-ul">
            <li @click="selectMusiclist(item)" v-for="(item,i) in discList" class="item" :key="i">
              <div class="left">
                <img v-lazy="item.imgurl">
              </div>
              <div class="right">
                <p class="desc" v-html="item.dissname"></p>
                <p class="name" v-html="item.creator.name"></p>
                <i class="icon-cheveron-right"></i>
              </div>
            </li>
          </ul>
        </div>
        <i-split />
        <div class="wrapper musiclistRecommend" v-show="!!discList.length">
          <h1 class="title">
            可能喜欢的歌单
            <router-link tag="i" class="icon-cheveron-right" to="/musiclist"></router-link>
          </h1>
          <ul class="list-ul">
            <li @click="selectMusiclist(item)" v-for="(item,i) in discList" class="item" :key="i">
              <div class="icon">
                <img v-lazy="item.imgurl">
                <div class="detail">
                  <i class="icon-headphones"></i>
                  <span class="listennum">{{itemlistennum(item.listennum)}}</span>
                </div>
              </div>
              <p class="desc" v-html="item.dissname"></p>
            </li>
          </ul>
        </div>
      </div>
    </i-scroll>
    <router-view  @sendRequest="sendRequest" :selectTabtype="tabtype"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getDiscList} from '@/api/recommend'
  import iScroll from '@/base/scroll/scroll'
  import iSplit from '@/base/split/split'

  const ERR_OK = 0
  export default {
    name: 'mymusic',
    data() {
      return {
        data: [],
        favoriteList: [],
        discList: [],
        tabtype: 0
      }
    },
    created() {
      this._getDiscList()
    },
    methods: {
      selectMusiclist(item) {

      },
      selectTab(i) {
        console.log(i);
        this.tabtype = i
      },
      _getDiscList() {
        this.sendRequest(1)
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.sendRequest(0)
            this.discList = res.data.list.slice(0,9)
          }
        })
      },
      sendRequest(state) {
        this.isLoading = !!state
      },
      itemlistennum(num) {
        num += ""
        const len = num.length
        return (len > 4)? num.slice(0, len-4) + "万": num
      },
    },
    components: {
      iScroll,
      iSplit,
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  // base
  .wrapper
    .title
      position: relative
      height: 50px
      line-height: 50px
      padding-left: 6px
      text-align: left
      font-size: $font-size-medium-x
      color: $color-text-l
      font-weight: 600
      i
        float: right
        width: 50px
        height: 50px
        line-height: 50px
        padding-right: 3px
        text-align: right
        font-size: $font-size-g
    .list-ul
      display: inline-block
      padding: 0 3px
      margin-bottom: 6px
  // detail
  .mymusic, .mymusic-scroll
    width: 100%
    height: 100%
    overflow: hidden
    .tab-wrapper
      display: flex;
      width: 100%;
      height: 100px;
      padding: 36px 6px 0 6px;
      box-sizing: border-box;
      .tab-item
        flex: 1;
        display: flex;
        flex-direction: column;
        text-align: center;
        line-height: 30px;
        i
          font-size: $font-size-large-x
        span
          font-weight: 600
    .musiclistFavorite
      li.item
        display: flex
        flex-direction: row
        box-sizing: border-box
        width: 100%
        float: left
        padding: 6px
        .left
          width: 60px
          position: relative
          img
            width: 100%
            border-radius: 5px
          .name
            position: absolute
            bottom: 2px
            left: 2px
            width: calc(100% - 2px)
            height: 14px
            line-height: 14px
            border-bottom-right-radius: 6px
            border-bottom-left-radius: 6px
            overflow: hidden
            background: rgba(0,0,0,.5)
            color: $color-background
          .detail
            color: $color-background
            display: inline-block
            position: absolute
            bottom: 12px
            left: 0
            width: 100%
            text-align: center
          &:before
            content: ""
            display: inline-block
            width: 0
            height: 0
            border-left: 20px solid rgba(255, 255, 255, .8)
            border-top: 10px solid transparent
            border-bottom: 10px solid transparent
            position: absolute
            z-index: 10
            left: 50%
            top: 50%
            transform: translate3d(-50%, -50%, 0)
        .right
          position: relative
          padding: 12px
          flex: 1
          .desc
            height: 20px
            overflow: hidden
          .name
            width: 100%
            color: $color-text-weak
          i
            position: absolute
            right: 0
            top: 50%;
            transform: translateY(-50%)
            font-size: $font-size-large
    .musiclistRecommend
      li.item
        display: flex
        flex-direction: column
        box-sizing: border-box
        width: 33.33%
        float: left
        padding: 6px
        .icon
          width: 100%
          position: relative
          img
            width: 100%
            border-radius: 5px
          .name
            position: absolute
            bottom: 2px
            left: 2px
            width: calc(100% - 2px)
            height: 14px
            line-height: 14px
            border-bottom-right-radius: 6px
            border-bottom-left-radius: 6px
            overflow: hidden
            background: rgba(0,0,0,.5)
            color: $color-background
          .detail
            color: $color-background
            font-size: $font-size-small-s
            display: inline-block
            position: absolute
            bottom: 3px
            left: 3px
        .desc
          height: 30px;
          line-height: 15px
          padding-top: 5px
          overflow: hidden
          font-size: $font-size-small
          color: $color
</style>