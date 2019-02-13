<template>
  <!-- <transition name="slide"> -->
    <div class="singerDetail">
      <div class="back-wrapper">
        <i class="icon-cheveron-left" @click="hide"></i>
        <span class="title">{{title}}</span>
      </div>
      <div class="bg-wrapper" :style="bgStyle" ref="bgImage">
        <div class="filter" ref="filter"></div>
      </div>
      <div class="bg-layer" ref="layer">
        <div class="play-wrapper">
          <div ref="playBtn" v-show="songs.length>0"  @click="random" class="play"> <!-- @click="random" -->
            <i class="icon-play"></i>
            <span class="text">播放全部</span>
          </div>
        </div>
      </div>
      <i-scroll :data="songs" @scroll="scroll" :listen-scroll="listenScroll" :probe-type="probeType" class="list-wrapper" ref="listWrapper">
        <div class="list">
          <song-list @selectSong="selectSong" :list="songs" />
        </div>
      </i-scroll>
    </div>
  <!-- </transition> -->
</template>

<script type="text/ecmascript-6">
  import iScroll from '@/base/scroll/scroll'
  import songList from '@/base/songlist/songlist'
  import {prefixStyle} from '@/common/js/dom'
  import Bus from '@/common/js/bus'

  const RESERVED_HEIGHT = 40
  const transform = prefixStyle('transform')
  const backdrop = prefixStyle('backdrop-filter')

  export default {
    props: {
      songs: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ''
      },
      bgImage: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        scrollY: 0,
        probeType: 3,
        listenScroll: true
      }
    },
    mounted() {
      this.imageHeight = this.$refs.bgImage.clientHeight
      this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
      this.$refs.listWrapper.$el.style.top = `${this.imageHeight}px`
    },
    computed: {
      bgStyle() {
        return `background-image:url(${this.bgImage})`
      }
    },
    methods: {
      hide() {
        this.$router.go(-1)
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      random() {
        this.selectSong({}, 0)
      },
      selectSong(item, i) {
        // console.log(item)
        Bus.$emit('selectSong', this.songs, i)
      },
      newsongName(name, subtitle) {
        return !!subtitle? name + " " + subtitle: name
      },
    },
    watch: {
      scrollY(newVal) {
        let translateY = Math.max(this.minTransalteY, newVal)
        let scale = 1
        let zIndex = 0
        let blur = 0
        const percent = Math.abs(newVal / this.imageHeight)
        if (newVal > 0) {
          scale = 1 + percent
          zIndex = 10
        } else {
          blur = Math.min(20, percent * 20)
        }

        this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
        this.$refs.filter.style[backdrop] = `blur(${blur}px)`
        if(newVal < this.minTransalteY + 50 && newVal >= this.minTransalteY) {
          this.$refs.playBtn.style.display = 'none'
          zIndex = 1
          this.$refs.bgImage.style.paddingTop = '60%'
          this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
        }else if (newVal < this.minTransalteY) {
          zIndex = 40
          this.$refs.bgImage.style.paddingTop = 0
          this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
        } else {
          this.$refs.bgImage.style.paddingTop = '60%'
          this.$refs.bgImage.style.height = 0
          this.$refs.playBtn.style.display = ''
        }
        this.$refs.bgImage.style[transform] = `scale(${scale})`
        this.$refs.bgImage.style.zIndex = zIndex
      }
    },
    components: {
      iScroll,
      songList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .singerDetail
    max-width()
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index: 20
    transition: all 0.2s linear
    -webkit-transition: all 0.2s linear
    .back-wrapper
      max-width()
      position: fixed
      top: 0
      bottom: 0
      z-index: 50
      width: 100%
      height: 36px
      line-height: 36px
      text-align: center
      color: $color-theme
      .icon-cheveron-left
        display: inline-block
        position: absolute
        left: 6px
        top: 50%
        transform: translateY(-50%)
        width: 38px
        font-size: 24px
        text-align: left
      .title
        font-size: 15px
        font-weight: 600
    .bg-wrapper
      position: relative
      width: 100%
      height: 0
      padding-top: 60%
      background: $color-background
      transform-origin: top
      background-size: cover
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      z-index 2
      .play-wrapper
        position: absolute
        top: -40px
        z-index: 21
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          background: rgba(53, 81, 132, 0.2)
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
    .list-wrapper
      position: fixed
      top: 0
      bottom: 0
      z-index: 30
      width: 100%
      background: $color-background
      .list
        padding: 0
        background: $color-background
</style>