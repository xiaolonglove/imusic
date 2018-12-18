<template>
  <i-scroll ref="scroll" class="recommend" :data="discList">
    <div>
      <div class="slider-wrapper" v-if="recommends.length" ref="sliderWrapper">
        <i-slider>
          <div v-for="(item,i) in recommends" :key="i">
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
        <div class="tab-item" @click="clickSinger">
          <i class="icon-mine"></i>
          <span>歌手</span>
        </div>
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
      <div class="musicRecommend-wrapper">
        <h1 class="title">热门歌单推荐<i class="icon-arrow-right"></i></h1>
        <ul class="list-content">
          <li @click="selectItem(item)" v-for="(item,i) in discList" class="item" :key="i">
            <div class="icon">
              <img v-lazy="item.imgurl">
              <h2 class="name" v-html="item.creator.name"></h2>
              <span class="listennum">{{itemlistennum(item.listennum)}}</span>
            </div>
            <p class="desc" v-html="item.dissname"></p>
          </li>
        </ul>
      </div>
    </div>
    <i-loading v-show="isLoading"></i-loading>
  </i-scroll>
</template>

<script type="text/ecmascript-6">
  import {ERR_OK} from '@/api/config'
  import {getRecommend, getDiscList} from '@/api/recommend'
  import iScroll from '@/base/scroll/scroll'
  import iSlider from '@/base/slider/slider'
  import iLoading from '@/base/loading/loading'
  import iSplit from '@/base/split/split'
  
  export default {
    data() {
      return {
        recommends: [],
        discList: [],
        isLoading: true
      }
    },
    created() {
      this.isLoading = true
      this._getRecommend()
      this._getDiscList()
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
      selectItem(item) {
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
        console.log('点击歌手');
      },
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
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
      }
    },
    components: {
      iScroll,
      iSlider,
      iSplit,
      iLoading,
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  .title
    position: relative
    height: 50px
    line-height: 50px
    padding: 0 5px
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
          font-size: $font-size-medium
    .musicRecommend-wrapper
      .title
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
        li.item
          display: flex
          flex-direction: column
          box-sizing: border-box
          width: 33.33%
          float: left
          padding: 0 5px
          margin-bottom: 5px
          .icon
            width: 100%
            position: relative
            img
              width: 100%
              border-radius: 5px
            .name
              position: absolute
              bottom: 1px
              left: 1px
              width: 100%
              height: 14px
              line-height: 14px
              overflow: hidden
              background: rgba(0,0,0,.5)
              color: #fff
            .listennum
              color: #fff
              font-size: $font-size-small-s
              display: inline-block
              position: absolute
              top: 1px
              right: 1px
          .desc
            line-height: 15px
            overflow: hidden
            font-size: $font-size-small
            color: $color-text-l
</style>