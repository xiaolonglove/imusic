<template>
  <i-scroll ref="scroll" class="recommend" :data="newsongList">
    <div>
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
        <div class="tab-item">
          <i class="icon-playlist"></i>
          <span>歌单</span>
        </div>
        <router-link tag="div" class="tab-item" to="/singer">
          <i class="icon-mine"></i>
          <span>歌手</span>
        </router-link>
        <div class="tab-item">
          <i class="icon-playlist"></i>
          <span>电台</span>
        </div>
        <div class="tab-item">
          <i class="icon-playlist"></i>
          <span>排行</span>
        </div>
      </div>
      <i-split />
      <div class="wrapper musiclistRecommend">
        <h1 class="title">热门歌单推荐<i class="icon-arrow-right"></i></h1>
        <ul class="list-content">
          <li @click="selectMusiclist(item)" v-for="(item,i) in discList" class="item" :key="i">
            <div class="icon">
              <img v-lazy="item.imgurl">
              <!-- <h2 class="name" v-html="item.creator.name"></h2> -->
              <span class="listennum">{{itemlistennum(item.listennum)}}</span>
            </div>
            <p class="desc" v-html="item.dissname"></p>
          </li>
        </ul>
      </div>
      <i-split />
      <div class="wrapper broadcasting">
        <h1 class="title">精选电台<i class="icon-arrow-right"></i></h1>
          <div class="container" ref="broadContainer">
            <ul class="list-content" ref="broadUl">
              <li ref="broadItem" class="item" @click="selectBroadcasting(item)" v-for="(item,i) in broadcastingList" :key="i">
                <div class="icon">
                  <img v-lazy="item.radioImg">
                  <span class="listennum">{{itemlistennum(item.listenNum)}}</span>
                  <p class="desc" v-html="item.radioName"></p>
                </div>
              </li>
            </ul>
          </div>
      </div>
      <i-split />
      <div class="wrapper newsong">
        <h1 class="title">新歌首发<i class="icon-arrow-right"></i></h1>
        <ul class="list-content" ref="newsongUl">
          <li ref="newsongItem" class="item"  v-for="(item,i) in newsongList" :key="i">
            <div class="icon">
              <img v-lazy="newsongItemImg(item.album.mid)">
              <p class="name" v-html="item.name"></p>
              <p class="desc" v-html="'你还'"></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <i-loading v-show="isLoading"></i-loading>
    <router-view></router-view>
  </i-scroll>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import {getRecommends, getSliders, getDiscList, getBroadcasting} from '@/api/recommend'
  import iScroll from '@/base/scroll/scroll'
  import iLoading from '@/base/loading/loading'
  import iSplit from '@/base/split/split'
  import iSlider from '@/base/slider/slider'

  const ERR_OK = 0
  export default {
    data() {
      return {
        sliders: [], //
        discList: [],
        broadcastingList: [],
        newsongList: [],
        newsongTabs: [],
        isLoading: true,
      }
    },
    created() {
      this.isLoading = true
      this._getSliders()
      this._getDiscList()
      this._getBroadcasting()
      this._getRecommends()
    },
    updated() {
      this.$nextTick(() => {
        this._initBroadScroll()
      })
    },
    watch: {
      '$route' (to, from) {
      }
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
      musiclistRecommend(item) {
        // this.$router.push({
        //   path: `/recommend/${item.dissid}`
        // })
        // this.setDisc(item)
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
      clickSinger() {
        // this.$router.push({
        //   path: `/singer`
        // })
        this.$refs.singerRef.show();
      },
      newsongItemImg(mid) {
        const url = 'https://y.gtimg.cn/music/photo_new/T002R90x90M000'+ mid +'.jpg?max_age=2592000'
        return url
      },
      _getSliders() {
        getSliders().then((res) => {
          if (res.code === ERR_OK) {
            this.sliders = res.data.slider
          }
        })
      },
      _getDiscList() {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.isLoading = false;
            this.discList = res.data.list.slice(0,6)
          }
        })
      },
      _getBroadcasting() {
        getBroadcasting().then((res) => {
          if (res.code === ERR_OK) {
            const data = res.data.data.groupList[0].radioList
            this.broadcastingList = res.data.data.groupList[0].radioList;
          }
        })
      },
      _getRecommends() {
        getRecommends('new_song').then((res) => {
          if (res.code === ERR_OK) {
            this.newsongList = res.data.song_list.slice(0,6)
            this.newsongTabs = res.data.type_info
          }
        })
      },
      _initBroadScroll(){
        if (!this.broadScroll) {
          this.broadScroll=new BScroll(this.$refs.broadContainer, {
            startX:0,
            click:true,
            scrollX:true,
            scrollY:false,
            eventPassthrough:'vertical'
          });
        }else{
          // let width=0
          // for (let  i = 0; i <this.BroadcastingList.length; i++) {
          //   width+=this.$refs.broadItem[0].getBoundingClientRect().width; //getBoundingClientRect() 返回元素的大小及其相对于视口的位置
          // }
          // this.$refs.broadUl.style.width=width+'px'
          this.broadScroll.refresh()
        }
      }
    },
    components: {
      iScroll,
      iSplit,
      iLoading,
      iSlider,
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
        width: 30px
        height: 30px
        line-height: 30px
        text-align: center
        position: absolute
        top: 50%
        right: 0
        transform: translateY(-15px)
    .list-content
        display: inline-block
        padding: 0 3px
  // detail
  .recommend
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
            color: #fff
          .listennum
            color: #fff
            font-size: $font-size-small-s
            display: inline-block
            position: absolute
            top: 2px
            right: 2px
        .desc
          height: 30px;
          line-height: 15px
          padding-top: 5px
          overflow: hidden
          font-size: $font-size-small
          color: $color
    .broadcasting
      .container
        width 100%
        overflow: hidden;
        ul.list-content
          white-space: nowrap;
          padding-bottom: 8px
          li.item
            box-sizing: border-box
            flex-shrink: 0;
            padding: 6px;
            width: 112px;
            height 112px
            display: inline-block;
            position: relative
            .icon
              width: 100%
              img
                width: 100%
                border-radius: 50%
              .desc
                text-align: center
                margin-top: 5px
              .listennum
                position: absolute
                bottom: 15px
                color: $color-background
                left: 50%
                transform: translateX(-50%)
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
            color: #fff
</style>