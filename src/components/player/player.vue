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
          <div class="singer" @click.stop="1">{{ currentSong.singer ||''}}</div>
        </div>
        <div class="middle"
          @touchstart.prevent="middleTouchStart"
          @touchmove.prevent="middleTouchMove"
          @touchend="middleTouchEnd"
          >
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdCls">
                <img class="image" :src="currentSong.image ||''">
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">{{playingLyric}}</div>
            </div>
          </div>
          <i-scroll class="middle-r" ref="lyricList" :data="currentLyric && currentLyric.lines">
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p ref="lyricLine"
                   class="text"
                   :class="{'current': currentLineNum ===index}"
                   v-for="(line,index) in currentLyric.lines" :key="index">{{line.txt}}</p>
              </div>
            </div>
          </i-scroll>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{'active':currentShow==='cd'}"></span>
            <span class="dot" :class="{'active':currentShow==='lyric'}"></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
            </div>
            <span class="time time-r">{{format(currentSong.duration ||'')}}</span>
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
              <i :class="currentModeicon" @click.stop="toggleMode"></i>
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
      <div class="miniPlayer border-1px" @click="toggleFull">
        <div ref="miniPlayerProgress" class="miniPlayer-Progress"></div>
        <div class="miniPlayer-left">
          <div class="nothing" v-if="!currentSong">音乐 让生活充满快乐</div>
          <div class="content" v-if="!!currentSong">
            <img :class="{'animate-scan': playing}" :src="currentSong.image ||''">
            <div class="text">
              <span class="name">{{currentSong.name ||''}}</span>
              <span class="singer">{{currentSong.singer ||''}}</span>
            </div>
          </div>
        </div>
        <div class="miniPlayer-right">
          <i @click.stop="togglePlaying" :class="{'icon-play-outline': !playing, 'icon-pause-outline': !!playing}"></i>
          <i class="icon-next" @click.stop="next"></i>
          <i class="icon-playlist" @click.stop="showPlaylist"></i>
        </div>
      </div>
    </transition>
    <play-list :playList="playList" :currentSong="currentSong" @selectSong="selectSong" @empty="emptyPlaylist" ref="playList" />
    <audio ref="audio" :src="!!currentSong && currentSong.url" @play="ready" @error="error" @timeupdate="updateTime" @ended="end"></audio>
  </div>
</template>

<script type="text/ecmascript-6">
  import Lyric from 'lyric-parser'
  import {playMode} from '@/common/js/config'
  import Bus from '@/common/js/bus'
  import {prefixStyle} from '@/common/js/dom'
  import iScroll from '@/base/scroll/scroll'
  import ProgressBar from '@/base/progressBar/progressBar'
  import playList from '@/components/playList/playList'

  const transform = prefixStyle('transform')
  const transitionDuration = prefixStyle('transitionDuration')

  export default {
    props: {
    },
    data() {
      return {
        songReady: false,
        fullScreen: false,
        playing: false,
        playList: [],
        currentSong: null,
        currentIndex: 0,
        currentLyric: null,
        currentShow: 'cd',
        currentTime: 0,
        currentMode: 1,
        currentLineNum: 0,
        playingLyric: '',

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
      },
      percent() {
        return this.currentTime / this.currentSong.duration
      },
    },
    watch: {
      currentSong(newSong, oldSong) {
        // console.log(newSong)
        const self = this;
        if (!newSong || !newSong.id) {
          return
        }
        if (newSong.id === (oldSong && oldSong.id)) {
          return
        }
        if (this.currentLyric) {
          this.currentLyric.stop()
          this.currentTime = 0
          this.playingLyric = ''
          this.currentLineNum = 0
        }
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          self.$refs.audio.play()
          self.getLyric()
        }, 1000)
      },
      playing(newPlaying) {
        const audio = this.$refs.audio
        this.$nextTick(() => {
          newPlaying ? audio.play() : audio.pause()
        })
      }
    },
    mounted(){
      const self = this;
      //监听其他列表选择歌曲事件
      Bus.$on('selectSong', function(list, i){
        // console.log(song);
        self.playList = list
        self.currentSong = list[i]
        self.playing = true
        self.currentIndex = i
      })
    },
    created() {
      this.touch = {}
    },
    methods: {
      toggleFull() {
        if(!this.songReady) return
        this.fullScreen = !this.fullScreen
      },
      showPlaylist() {
        if(this.playList && this.playList.length > 0) {
          this.$refs.playList.show()
        }
      },
      togglePlaying() {
        if (!this.songReady) return
        this.playing = !this.playing
        if (this.currentLyric) {
          this.currentLyric.togglePlay()
        }
      },
      prev() {
        if (!this.songReady) return
        if (this.playList.length === 1) {
          this.loop()
          return
        } else {
          let index = this.currentIndex - 1
          if (index === -1) {
            index = this.playList.length - 1
          }
          this.setCurrentIndex(index)
          if (!this.playing) {
            this.togglePlaying()
          }
        }
        this.songReady = false
      },
      next() {
        if (!this.songReady) return
         
        if (this.playList.length === 1) {
          this.loop()
          return
        } else {
          let index = this.currentIndex + 1
          if (index === this.playList.length) {
            index = 0
          }
          this.setCurrentIndex(index)
          if (!this.playing) {
            this.togglePlaying()
          }
        }
        this.songReady = false
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
        if (this.currentLyric) {
          this.currentLyric.seek(0)
        }
      },
      ready() {
        this.songReady = true
        // this.savePlayHistory(this.currentSong)
      },
      selectSong(song, i) {
        this.currentSong = song
        this.currentIndex = i
      },
      emptyPlaylist(state) {
        if(state) {
          this.playList = []
          this.currentSong = null
          this.playing = false
          this.songReady = false
          this.fullScreen = false
          this.setMiniPlayerProgress(0)
        }
      },
      savePlayHistory(song) {
        console.log(savePlay(song))
      },
      error() {
        this.songReady = true
      },
      updateTime(e) {
        if(!this.songReady) return
        const currentTime = e.target.currentTime
        this.currentTime = currentTime
        this.setMiniPlayerProgress(currentTime)
      },
      setCurrentIndex(i) {
        this.currentIndex = i
        this.currentSong = this.playList[i]
      },
      setMiniPlayerProgress(time) {
        const $miniPlayerProgress = this.$refs.miniPlayerProgress,
        currentSong = this.currentSong;
        let rate = 0
        if(currentSong && currentSong.duration) {
          rate = (parseFloat(time) / parseFloat(currentSong.duration) * 100)
        }
        $miniPlayerProgress && ($miniPlayerProgress.style.width = rate+ '%')
      },
      toggleMode() {
        if (!this.songReady) return
        
        // switch (this.currentMode) {
        //   case 1:
        //     this.currentMode = 2
        //     break;
        //   case 2:
        //     this.currentMode = 3
        //     break;
        //   case 3:
        //     this.currentMode = 1
        //     break;
        //   default:
        //     break;
        // }
      },
      middleTouchStart(e) {
        this.touch.initiated = true
        const touch = e.touches[0]
        this.touch.startX = touch.pageX
        this.touch.startY = touch.pageY
      },
      middleTouchMove(e) {
        if (!this.touch.initiated) {
          return
        }
        const touch = e.touches[0]
        const deltaX = touch.pageX - this.touch.startX
        const deltaY = touch.pageY - this.touch.startY
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          return
        }
        const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
        const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
        this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
        this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
        this.$refs.lyricList.$el.style[transitionDuration] = 0
        this.$refs.middleL.style.opacity = 1 - this.touch.percent
        this.$refs.middleL.style[transitionDuration] = 0
      },
      middleTouchEnd() {
        let offsetWidth
        let opacity
        if (this.currentShow === 'cd') {
          if (this.touch.percent > 0.1) {
            offsetWidth = -window.innerWidth
            opacity = 0
            this.currentShow = 'lyric'
          } else {
            offsetWidth = 0
            opacity = 1
          }
        } else {
          if (this.touch.percent < 0.9) {
            offsetWidth = 0
            this.currentShow = 'cd'
            opacity = 1
          } else {
            offsetWidth = -window.innerWidth
            opacity = 0
          }
        }
        const time = 300
        this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
        this.$refs.lyricList.$el.style[transitionDuration] = `${time}ms`
        this.$refs.middleL.style.opacity = opacity
        this.$refs.middleL.style[transitionDuration] = `${time}ms`
        this.touch.initiated = false
      },
      onProgressBarChange(percent) {
        const currentTime = this.currentSong.duration * percent
        this.$refs.audio.currentTime = currentTime
        if (!this.playing) {
          this.togglePlaying()
        }
        if (this.currentLyric) {
          this.currentLyric.seek(currentTime * 1000)
        }
      },
      getLyric() {
        const self = this;
        this.currentSong.getLyric().then((lyric) => {
          if (self.currentSong.lyric !== lyric) return

          self.currentLyric = new Lyric(lyric, self.handleLyric)
          if (self.playing) {
            self.currentLyric.play()
          }
        }).catch(() => {
          self.currentLyric = null
          self.playingLyric = ''
          self.currentLineNum = 0
        })
      },
      handleLyric({lineNum, txt}) {
        if(!this.songReady) return
        this.currentLineNum = lineNum
        if (lineNum > 5) {
          let lineEl = this.$refs.lyricLine[lineNum - 5]
          this.$refs.lyricList.scrollToElement(lineEl, 1000)
        } else {
          this.$refs.lyricList.scrollTo(0, 0, 1000)
        }
        this.playingLyric = txt
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
    components: {
      iScroll,
      ProgressBar,
      playList,
    }
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
        font-size: $font-size-medium-xx
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
      bottom: 200px
      white-space: nowrap
      font-size: 0
      .middle-l
        display: inline-block
        vertical-align: top
        position: relative
        width: 100%
        height: 0
        padding-top: 80%
        .cd-wrapper
          position: absolute
          left: 10%
          top: 0
          width: 80%
          height: 100%
          .cd
            width: 100%
            height: 100%
            box-sizing: border-box
            border: 10px solid rgba(255, 255, 255, 0.1)
            border-radius: 50%
            &.play
              animation: rotate 20s linear infinite
            &.pause
              animation-play-state: paused
            .image
              position: absolute
              left: 0
              top: 0
              width: 100%
              height: 100%
              border-radius: 50%
        .playing-lyric-wrapper
          width: 80%
          margin: 30px auto 0 auto
          overflow: hidden
          text-align: center
          .playing-lyric
            height: 20px
            line-height: 20px
            font-size: $font-size-medium
            color: $color-background-l
      .middle-r
        display: inline-block
        vertical-align: top
        width: 100%
        height: 100%
        overflow: hidden
        .lyric-wrapper
          width: 80%
          margin: 0 auto
          overflow: hidden
          text-align: center
          .text
            line-height: 32px
            color: $color-background-l
            font-size: $font-size-medium
            &.current
              color: $color-theme
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
            padding: 10px
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
      display: flex
      align-items: center
      justify-content: center
      i
        flex: 1
        height: 100%
        display: flex
        align-items: center
        justify-content: center
        padding: 0 6px
        font-size: 20px
        color: $color-theme
        &:last-child
          padding-left: 12px
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