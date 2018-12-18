<template>
  <i-scroll ref="scroll" class="recommend" :data="discList">
    <div>
      <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
        <i-slider>
          <div v-for="(item,i) in recommends" :key="i">
            <a href="javascript:void(0)">
              <img class="needsclick" @load="loadImage" :src="item.picUrl">
            </a>
          </div>
        </i-slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li @click="selectItem(item)" v-for="(item,i) in discList" class="item" :key="i">
            <div class="icon">
              <img width="60" height="60" v-lazy="item.imgurl">
            </div>
            <div class="text">
              <h2 class="name" v-html="item.creator.name"></h2>
              <p class="desc" v-html="item.dissname"></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <i-loading v-show="!discList.length"></i-loading>
  </i-scroll>
</template>

<script type="text/ecmascript-6">
  import {ERR_OK} from '@/api/config'
  import {getRecommend, getDiscList} from '@/api/recommend'
  import iScroll from '@/base/scroll/scroll'
  import iSlider from '@/base/slider/slider'
  import iLoading from '@/base/loading/loading'
  
  export default {
    data() {
      return {
        recommends: [],
        discList: []
      }
    },
    created() {
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
        this.$router.push({
          path: `/recommend/${item.dissid}`
        })
        this.setDisc(item)
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
            this.discList = res.data.list
          }
        })
      }
    },
    components: {
      iScroll,
      iSlider,
      iLoading,
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  .recommend
    height: 100%
    overflow: hidden
    .slider-wrapper
      position: relative
      width: 100%
      overflow: hidden
    .recommend-list
      .list-title
        height: 65px
        line-height: 65px
        text-align: center
        font-size: $font-size-medium
        color: $color-text-l
      .item
        display: flex
        box-sizing: border-box
        align-items: center
        padding: 0 20px 20px 20px
        .icon
          flex: 0 0 60px
          width: 60px
          padding-right: 20px
        .text
          display: flex
          flex-direction: column
          justify-content: center
          flex: 1
          line-height: 20px
          overflow: hidden
          font-size: $font-size-medium
          .name
            margin-bottom: 10px
            color: $color-text
          .desc
            color: $color-text-d
</style>