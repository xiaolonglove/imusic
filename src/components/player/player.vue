<template>
  <div class="player">
    <transition name="fullPlayer">
      <div class="fullPlayer" v-show="!!fullScreen">
        <div class="background">
          <img width="100%" height="100%" v-if="!!songPlay" :src="songPlay.image">
        </div>
        <div class="top" @click="toggleFull">
          <i class="icon-cheveron-down"></i>
          <span class="name">{{songPlay.name||''}}</span>
          <div class="singer" @click.stop="1">{{ ('‒ '+songPlay.singer + ' ‒') ||''}}</div>
        </div>
        <div class="middle">

        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{'active':currentShow==='cd'}"></span>
            <span class="dot" :class="{'active':currentShow==='lyric'}"></span>
          </div>
          <div class="operators1-wrapper">
            <div class="icon i-left">
              <i :class="currentModeicon" @click.stop="changeMode"></i>
            </div>
            <div class="icon i-center">
              <i class="icon-heart"></i>
            </div>
            <div class="icon i-right">
              <i class="icon-playlist" @click.stop="showPlaylist"></i>
            </div>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <!-- <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar> -->
            </div>
            <span class="time time-r">{{format(songPlay.duration)}}</span>
          </div>
          <div class="operators2-wrapper">
            <div class="icon i-left" :class="disableCls">
              <i @click.stop="prev" class="icon-backward-step"></i>
            </div>
            <div class="icon i-center" :class="disableCls">
              <i @click.stop="togglePlaying" :class="playIcon"></i>
            </div>
            <div class="icon i-right" :class="disableCls">
              <i @click.stop="next" class="icon-forward-step"></i>
            </div>
            
          </div>
        </div>
      </div>
    </transition>
    <transition name="miniPlayer">
      <div class="miniPlayer border-1px" v-show="!fullScreen" @click="toggleFull">
        <div class="miniPlayer-left">
          <div class="nothing" v-if="!songPlay">音乐 让生活充满快乐</div>
          <div class="content" v-if="!!songPlay">
            <img :class="{'animate-scan': isPlay}" v-lazy="songPlay.image">
            <div class="text">
              <span class="singer">{{songPlay.singer}}</span>
              <span class="name">{{songPlay.name}}</span>
            </div>
          </div>
        </div>
        <div class="miniPlayer-right">
          <i @click.stop="togglePlay" :class="{'icon-play-outline': !isPlay, 'icon-pause-outline': !!isPlay}"></i>
          <i class="icon-playlist" @click.stop="showPlaylist"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      songPlay: {
        type: Object,
        default: null
      },
      // fullScreen: {
      //   type: Boolean,
      //   default: false
      // },
      // isPlay: {
      //   type: Boolean,
      //   default: false
      // }
    },
    data() {
      return {
        songReady: false,
        fullScreen: false,
        isPlay: false,
        currentShow: 'cd',
        currentTime: 0,
        currentMode: 1,
      }
    },
    computed: {
      cdCls() {
        return this.playing ? 'play' : 'play pause'
      },
      playIcon() {
        return this.playing ? 'icon-pause' : 'icon-play'
      },
      disableCls() {
        return this.songReady ? '' : 'disable'
      },
      currentModeicon() {
        let icon = 'icon-reload'
        switch (this.currentMode) {
          case 1:
            icon = 'icon-reload'
            break;
          case 2:
            icon = 'icon-shuffle'
            break;
          case 3:
            icon = 'icon-loop1'
            break;
          default:
            break;
        }
        return icon
      }
    },
    methods: {
      toggleFull() {
        this.fullScreen = !this.fullScreen
      },
      showPlaylist() {
        console.log('打开播放列表');
      },
      prev() {
        if (!this.songReady) {
          return
        }
      },
      togglePlaying() {
        if (!this.songReady) {
          return
        }
        this.isPlay = !this.isPlay
      },
      next() {
        if (!this.songReady) {
          return
        }
      },
      changeMode() {
        switch (this.currentMode) {
          case 1:
            this.currentMode = 2
            break;
          case 2:
            this.currentMode = 3
            break;
          case 3:
            this.currentMode = 1
            break;
          default:
            break;
        }
      },
      format(interval) {
        interval = interval | 0
        const minute = interval / 60 | 0
        const second = this._pad(interval % 60)
        return `${minute}:${second}`
      },
      _pad(num, n = 2) {
        let len = num.toString().length
        while (len < n) {
          num = '0' + num
          len++
        }
        return num
      },
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  .fullPlayer
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 110
    color: #fff
    background: #676a75
    .background
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      z-index: -1
      opacity: 0.2
      filter: blur(20px)
    .top
      position: fixed;
      width: 100%;
      height: 40px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center
      i
        display: inline-block
        position: absolute
        left: 0
        top: 50%
        transform: translateY(-50%)
        width: 38px
        padding: 6px 0
        font-size: 24px
        text-align: center
      .name
        font-size: 15px
        font-weight: 600
        display: inline-block
      .singer
        position: absolute
        left: 50%
        bottom: -18px
        transform: translateX(-50%)
        text-align: center
    .middle
      position: fixed
      width: 100%
      top: 80px
      bottom: 170px
      white-space: nowrap
      font-size: 0
    .bottom
      position: absolute
      bottom: 30px
      width: 100%
      .dot-wrapper
        text-align: center
        font-size: 0
        .dot
          display: inline-block
          vertical-align: middle
          margin: 0 4px
          width: 8px
          height: 8px
          border-radius: 50%
          background: #e4d6d6
          &.active
            width: 20px
            border-radius: 5px
            background: #fff
      .progress-wrapper
        display: flex
        align-items: center
        width: 80%
        margin: 0px auto
        .time
          color: #e4d6d6
          font-size: $font-size-small
          flex: 0 0 30px
          line-height: 30px
          width: 30px
          &.time-l
            text-align: left
          &.time-r
            text-align: right
        .progress-bar-wrapper
          flex: 1 
      .operators1-wrapper, .operators2-wrapper
        display: flex
        align-items: center
        padding: 30px 0 6px
        .icon
          flex: 1
          color: $color-theme
          &.disable
            color: $color-theme-d
          i
            font-size: 30px
        .i-left
          text-align: right
        .i-center
          padding: 0 18px
          text-align: center
        .i-right
          text-align: left
        .icon-favorite
          color: $color-sub-theme
      .operators1-wrapper
        .icon
          i
            color: #fff
            font-size: 20px
          .icon-playlist
            font-size: 18px
      .operators2-wrapper
        .i-center
          i
            font-size: 42px
      // .operators2-wrapper
      //   .i-center
      //     i
      //       display: inline-block;
      //       width: 42px
      //       height: 42px
      //       border: 1px solid;
      //       border-radius: 50%;
      //       &:before
      //         position: relative;
      //         left: 3px;
    &.fullPlayer-enter-active, &.fullPlayer-leave-active
      transition: all 0.4s
      .top, .bottom
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
    &.fullPlayer-enter, &.fullPlayer-leave-to
      opacity: 0
      // transform: translate3d(0, 100%, 0)
      .top
        transform: translate3d(0, -100px, 0)
      .bottom
        transform: translate3d(0, 100px, 0)
  .miniPlayer
    display: flex
    flex-direction: row
    box-sizing: border-box
    width: 100%
    height: 40px
    padding: 0 12px
    text-align: center
    font-size: 0
    color: #000
    background: $color-background
    border-1px($color-background-line)
    position: fixed
    bottom: 0
    left: 0
    z-index: 100
    &.miniPlayer-enter-active, &.miniPlayer-leave-active
      transition: all 0.4s
    &.miniPlayer-enter, &.miniPlayer-leave-to
      opacity: 0
    &:after
      top: 0
      bottom: 100%
      box-shadow: 0 -2px 6px $color-background-line
    .miniPlayer-left
      flex: 1
      width: 100%
      display: flex;
      align-items: center
      .content
        width: 100%
        height: 100%
        display: flex
        align-items: center
        img
          position: absolute
          width: 30px
          height: 30px
          border-radius: 50%
          &.animate-scan
            animation: rotate1 6s linear infinite
        .text
          width: 100%
          display: flex
          flex-direction: column
          align-items: left
          padding-left: 40px
          span
            font-size: $font-size-medium
            &.name
              color: $color-text-weak
              font-size: $font-size-small
              padding-top: 2px
      .nothing
        display: flex
        align-items: center
        height: 100%
        padding-left: 6px
        font-size: $font-size-medium
    .miniPlayer-right
      width: 80px
      display: flex
      align-items: center
      justify-content: center
      i
        flex: 1
        color: $color-theme
        font-size: 20px
        &:nth-child(1)
          position: relative
          top: 2px
        // &:nth-child(2)
  /* 顺时针旋转 */
  @keyframes rotate1 {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
  }
</style>