<template>
  <div class="recommend">
    <i-scroll class="recommend-scroll" ref="scroll" :data="newsongList">
      <div class="contentWrapper">
        <div class="slider-wrapper" v-if="sliders.length" ref="sliderWrapper">
          <i-slider>
            <div v-for="(item,i) in sliders" :key="i">
              <a href="javascript:void(0)">
                <img class="needsclick" @load="loadImage" :src="item.picUrl">
              </a>
            </div>
          </i-slider>
        </div>
        <div class="tab-wrapper">
          <router-link tag="div" class="tab-item" to="/disc">
            <i class="icon-playlist1"></i>
            <span>歌单</span>
          </router-link>
          <router-link tag="div" class="tab-item" to="/singer">
            <i class="icon-user"></i>
            <span>歌手</span>
          </router-link>
          <router-link tag="div" class="tab-item" to="/radio">
            <i class="icon-wallet"></i>
            <span>电台</span>
          </router-link>
          <router-link tag="div" class="tab-item" to="/top">
            <i class="icon-chart-bar"></i>
            <span>排行</span>
          </router-link>
        </div>
        <i-split />
        <div class="wrapper disc">
          <h1 class="title">
            热门歌单推荐
            <router-link tag="i" class="icon-cheveron-right" to="/disc"></router-link>
          </h1>
          <disc-list @selectDisclist="selectDisclist" :list="discList" />
        </div>
        <i-split />
        <div class="wrapper radio">
          <h1 class="title">
            精选电台
            <router-link tag="i" class="icon-cheveron-right" to="/radio"></router-link>
          </h1>
          <i-scroll ref="broadContainer" class="container" :data="radio.data" :scroll-x="radio.scrollX" :scroll-y="radio.scrollY">
          <!-- <div class="container" ref="broadContainer"> -->
            <ul class="list-ul" ref="broadUl">
              <li ref="broadItem" class="item" @click="selectBroadcasting(item)" v-for="(item,i) in radio.data" :key="i">
                <div class="icon">
                  <img v-lazy="item.radioImg">
                  <span class="listennum">{{itemlistennum(item.listenNum)}}</span>
                  <p class="desc" v-html="item.radioName"></p>
                </div>
              </li>
            </ul>
          <!-- </div> -->
          </i-scroll>
        </div>
        <i-split />
        <div class="wrapper newsong">
          <h1 class="title">
            新歌首发
            <router-link tag="i" class="icon-cheveron-right" to="/newsong"></router-link>
          </h1>
          <ul class="list-ul" ref="newsongUl">
            <li ref="newsongItem" class="item"  v-for="(item,i) in newsongList.slice(0,6)" :key="i">
              <div class="icon">
                <img v-lazy="newsongItemImg(item.album.mid)">
                <p class="name" v-html="item.name"></p>
                <p class="desc" v-html="newsongSinger(item.singer)"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </i-scroll>
    <i-loading v-show="isLoading"></i-loading>
    <router-view @sendRequest="sendRequest" :newsongList="newsongList" :newsongTabs="newsongTabs" :radioLists="radioLists"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getRecommends, getSliders, getRadioList, getNewSongList} from '@/api/recommend'
  import {getDiscList} from '@/api/disc'
  import iScroll from '@/base/scroll/scroll'
  import iLoading from '@/base/loading/loading'
  import iSplit from '@/base/split/split'
  import iSlider from '@/base/slider/slider'
  import discList from '@/base/disclist/disclist'

  const ERR_OK = 0
  export default {
    data() {
      return {
        sliders: [], //
        discList: [],
        radioLists: [],
        newsongList: [],
        newsongTabs: [],
        isLoading: true,
        radio: {
          data: [],
          scrollX: true,
          scrollY: false
        }
      }
    },
    created() {
      this.sendRequest(1)
      this._getSliders()
      this._getDiscList()
      this._getRadioList()
      this._getNewSongList()
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true
          this.$refs.scroll.refresh()
        }
      },
      selectDisclist() {
        console.log("选择了歌单")
      },
      selectBroadcasting(item) {
        // this.$router.push({
        //   path: `/recommend/${item.dissid}`
        // })
        // this.setDisc(item)
      },
      itemlistennum(num) {
        num += ""
        const len = num.length
        return (len > 4)? num.slice(0, len-4) + "万": num
      },
      newsongItemImg(mid) {
        const url = 'https://y.gtimg.cn/music/photo_new/T002R90x90M000'+ mid +'.jpg?max_age=2592000'
        return url
      },
      newsongSinger(singerList) {
        let ret = []
        if (!singerList) {
          return ''
        }
        singerList.forEach((s) => {
          ret.push(s.name)
        })
        return ret.join('/')
      },
      sendRequest(state) {
        this.isLoading = !!state
      },
      _getSliders() {
        getSliders().then((res) => {
          if (res.code === ERR_OK) {
            this.sliders = res.data.slider
          }
        }).catch((err) => {
          this.sendRequest(0)
        })
      },
      _getDiscList() {
        const params = {
          ein: 5
        }
        getDiscList(params).then((res) => {
          if (res.code === ERR_OK) {
            this.sendRequest(0)
            this.discList = res.data.list.slice(0,6)
          }
        }).catch((err) => {
          this.sendRequest(0)
        })
      },
      _getRadioList() {
        getRadioList().then((res) => {
          if (res.code === ERR_OK) {
            const data = res.data.data.groupList;
            this.radioLists = data;
            this.radio.data = data[0].radioList;
          }
        }).catch((err) => {
          this.sendRequest(0)
        })
      },
      _getNewSongList(i) {
        getNewSongList(i).then((res) => {
          this.newsongList = res.new_song.data.song_list || []
          const type_info = res.new_song.data.type_info
          type_info.unshift({
            id: 0,
            report: "0",
            title: "推荐"
          })
          this.newsongTabs = type_info || []

        }).catch((err) => {
          this.sendRequest(0)
        })
      },
    },
    components: {
      iScroll,
      iSplit,
      iLoading,
      iSlider,
      discList
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
  .recommend, .recommend-scroll
    width: 100%
    height: 100%
    overflow: hidden
    .slider-wrapper
      position: relative
      width: 100%
      overflow: hidden
    .tab-wrapper
      display: flex
      width: 100%
      height: 80px
      .tab-item
        flex: 1;
        display: flex;
        flex-direction: column;
        text-align: center;
        line-height: 30px;
        padding-top: 15px
        i
          font-size: $font-size-large-x
        span
          font-weight: 600
    .radio
      .container
        display: inline-block
        width 100%
        overflow: hidden
        .list-ul
          white-space: nowrap
          padding-bottom: 8px
          li.item
            box-sizing: border-box
            flex-shrink: 0
            padding: 6px
            width: 86px
            height 86px
            display: inline-block
            position: relative
            .icon
              width: 100%
              img
                width: 100%
                border-radius: 50%
              .desc
                text-align: center
                padding: 5px 0
                overflow: hidden
              .listennum
                position: absolute
                bottom: 15px
                color: $color-background
                left: 50%
                transform: translateX(-50%)
                no-wrap()
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
    .newsong
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
          p
            text-overflow: ellipsis
            white-space: nowrap
            overflow: hidden
          .name
            width: calc(100% - 2px)
            height: 14px
            line-height: 14px
            margin-top: 5px
            border-bottom-right-radius: 6px
            border-bottom-left-radius: 6px
            color: $color
          .desc
            padding: 3px 0
            color: $color-text-weak 
</style>