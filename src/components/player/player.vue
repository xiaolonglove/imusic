<template>
  <div class="player">
    <transition name="fullPlayer">
      <div class="fullPlayer" v-if="!!currentSong" v-show="!!fullScreen">
        <div class="background">
          <img width="100%" height="100%" v-if="!!currentSong" :src="currentSong.image">
        </div>
        <div class="top" @click="toggleFull">
          <i class="icon-cheveron-down"></i>
          <span class="name">{{currentSong.name||''}}</span>
          <div class="singer" @click.stop="1">{{ ('‒ '+currentSong.singer + ' ‒') ||''}}</div>
        </div>
        <div class="middle">

        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{'active':currentShow==='cd'}"></span>
            <span class="dot" :class="{'active':currentShow==='lyric'}"></span>
          </div>
          
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <!-- <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar> -->
            </div>
            <span class="time time-r">{{format(currentSong.duration)}}</span>
          </div>
          <div class="operators1-wrapper">
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
          <div class="operators2-wrapper">
            <div class="icon">
              <i :class="currentModeicon" @click.stop="changeMode"></i>
            </div>
            <div class="icon">
              <i class="icon-heart"></i>
            </div>
            <div class="icon">
              <i class="icon-playlist" @click.stop="showPlaylist"></i>
            </div>
            <div class="icon">
              <i class="icon-dots-horizontal-triple"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="miniPlayer">
      <div class="miniPlayer border-1px" v-show="!fullScreen" @click="toggleFull">
        <div ref="miniPlayerProgress" class="miniPlayer-Progress"></div>
        <div class="miniPlayer-left">
          <div class="nothing" v-if="!currentSong">音乐 让生活充满快乐</div>
          <div class="content" v-if="!!currentSong">
            <img :class="{'animate-scan': playing}" v-lazy="currentSong.image">
            <div class="text">
              <span class="name">{{currentSong.name}}</span>
              <span class="singer">{{currentSong.singer}}</span>
            </div>
          </div>
        </div>
        <div class="miniPlayer-right">
          <i @click.stop="togglePlaying" :class="{'icon-play-outline': !playing, 'icon-pause-outline': !!playing}"></i>
          <i class="icon-playlist" @click.stop="showPlaylist"></i>
        </div>
      </div>
    </transition>
    <audio ref="audio" :src="!!currentSong && currentSong.url" @play="ready" @error="error" @timeupdate="updateTime"
           @ended="end"></audio>
  </div>
</template>

<script type="text/ecmascript-6">
  import {playMode} from '@/common/js/config'
  import Bus from '@/common/js/bus'
  // import {saveSearch, clearSearch, deleteSearch, savePlay, saveFavorite, deleteFavorite} from '@/common/js/cache'

  export default {
    props: {
    },
    data() {
      return {
        songReady: true,
        fullScreen: false,
        playing: false,
        currentSong: null,
        currentIndex: 0,
        currentLyric: null,
        currentShow: 'cd',
        currentTime: 0,
        currentMode: 1,

        mode: playMode.sequence
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
    watch: {
      currentSong(newSong, oldSong) {
        const self = this;
        if (!newSong.id) {
          return
        }
        if (newSong.id === (oldSong && oldSong.id)) {
          return
        }
        // if (this.currentLyric) {
        //   this.currentLyric.stop()
        //   this.currentTime = 0
        //   this.playingLyric = ''
        //   this.currentLineNum = 0
        // }
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          self.$refs.audio.play()
          // self.getLyric()
        }, 1000)
      },
      playing(newPlaying) {
        const audio = this.$refs.audio
        this.$nextTick(() => {
          newPlaying ? audio.play() : audio.pause()
        })
      }
    },
    mounted:function(){
      const self = this;
      //监听选择歌曲事件
      Bus.$on('selectSong', function(song){
        // console.log(song);
        self.currentSong = song
        self.playing = true
      })
    },
    methods: {
      toggleFull() {
        this.fullScreen = !this.fullScreen
      },
      showPlaylist() {
        console.log('打开播放列表');
      },
      togglePlaying() {
        if (!this.songReady) {
          return
        }
        this.playing = !this.playing
      },
      prev() {
        if (!this.songReady) {
          return
        }
      },
      next() {
        if (!this.songReady) {
          return
        }
        if (this.playlist.length === 1) {
          this.loop()
          return
        } else {
          let index = this.currentIndex + 1
          if (index === this.playlist.length) {
            index = 0
          }
          this.currentIndex  = index
          if (!this.playing) {
            this.togglePlaying()
          }
        }
        this.songReady = false
      },
      ready() {
        this.songReady = true
        // this.savePlayHistory(this.currentSong)
      },
      savePlayHistory(song) {
        console.log(savePlay(song))
      },
      error() {
        this.songReady = true
      },
      updateTime(e) {
        const currentTime = e.target.currentTime
        this.currentTime = currentTime
        this.setMiniPlayerProgress(currentTime)
      },
      end() {
        if (this.mode === playMode.loop) {
          this.loop()
        } else {
          this.next()
        }
      },
      loop() {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
        this.playing = true
        // if (this.currentLyric) {
        //   this.currentLyric.seek(0)
        // }
      },
      setMiniPlayerProgress(time) {
        const rate = (parseFloat(time) / parseFloat(this.currentSong.duration) * 100)
        const $miniPlayerProgress = this.$refs.miniPlayerProgress
        $miniPlayerProgress && ($miniPlayerProgress.style.width = rate+ '%')
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
      bottom: 0
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
        padding: 24px
        .icon
          flex: 1
          color: $color-theme
          text-align: center
          &.disable
            color: $color-theme-d
          i
            font-size: 36px
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
        padding: 12px 0
        .i-center
          i
            font-size: 48px
      .operators2-wrapper
        .icon
          i
            color: #fff
            font-size: 20px
          .icon-playlist
            font-size: 18px
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
    border-1px($color-border)
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
      box-shadow: 0 -2px 6px $color-border
    .miniPlayer-Progress
      display: block
      position: absolute
      left: 0
      top: 0
      width: 0
      border-top: 2px solid $color-theme
      content: ' '
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
            &.singer
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