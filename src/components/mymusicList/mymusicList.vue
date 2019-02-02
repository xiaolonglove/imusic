<template>
  <transition name="slide">
    <div class="musiclist">
      <div class="back-wrapper">
        <i class="icon-cheveron-left" @click="hide"></i>
        <ul class="list-tabs">
          <li class="tab" :class="{tabActive: tabType == i}"
          @click="selectTab(i)"
          v-for="(item,i) in tabs" :key="i"
          >
            {{item}}
          </li>
        </ul>
      </div>
      <div class="list-wrapper">
        <i-nothing v-show="!songList.length" :iconClass="selectIconClass()" />
        <i-scroll
          :data="songList"
          class="scrollContainer"
          v-show="!!songList.length" 
        >
          <song-list @selectmusic="selectmusic" :list="songList"/>
        </i-scroll>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {getNewSongList} from '@/api/recommend'
  import iScroll from '@/base/scroll/scroll'
  import songList from '@/base/songlist/songlist'
  import iNothing from '@/base/nothing/nothing'

  const ERR_OK = 0
  export default {
    name: 'musiclist',
    props: {
      selectTabtype: {
        type: Number,
        default: 0
      },
    },
    data() {
      return {
        songList: [],
        showFlag: true,
        tabType: this.selectTabtype,
        tabs: ['本地音乐', '收藏音乐', '最近播放'],
        iconClass: ['icon-music-notes', 'icon-heart', 'icon-chart-pie']
      }
    },
    created() {
      this.selectTab()
    },
    methods: {
      hide() {
        this.$router.push('./mymusic')
      },
      selectmusic(item) {
        console.log(item);
      },
      selectTab(i) {
        if(this.tabType === i) return false
        if(i || i === 0) {
          this.tabType = i
        }
        switch (this.tabType) {
          case 0:
            this.songList = []
            break;
          case 1:
            this.songList = []
            // this._getNewSongList()
            break;
          case 2:
            this.songList = []
            break;
          default:
            break;
        }
      },
      selectIconClass() {
        return this.iconClass[this.tabType]
      },
      _getNewSongList(i) {
        this.sendRequest(1)
        getNewSongList(i).then((res) => {
          if (res.code === ERR_OK) {
            this.sendRequest(0)
            this.songList = res.new_song.data.song_list || []
          }
        }).catch((err) => {
          this.sendRequest(0)
        })
      },
      sendRequest(state) {
        this.$emit('sendRequest', state || 0)
      },
    },
    components: {
      iScroll,
      songList,
      iNothing
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
  .musiclist
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index: 10
    transition: all 0.2s linear
    -webkit-transition: all 0.2s linear
    .back-wrapper
      max-width()
      position: fixed
      top: 0
      bottom: 0
      z-index: 10
      width: 100%
      height: 36px
      line-height: 36px
      text-align: center;
      background: $color-background
      .icon-cheveron-left
        display: inline-block
        position: absolute
        left: 0
        top: 50%
        transform: translateY(-50%)
        width: 38px
        padding: 6px 0
        font-size: 24px
        text-align: center
      .list-tabs
        display: inline-block
        height: 100%
        text-align: center
        li.tab
          float: left
          box-sizing: border-box
          text-align: center
          border: 1px solid rgba(0,0,0,.4)
          height: 26px
          line-height: 26px
          margin-top: 5px
          padding: 0 12px
          &:nth-child(2)
            border-left: none
            border-right: none
          &.tabActive
            color: $color-background
            background: $color
    .list-wrapper
      display: flex
      width: 100%
      height: calc(100% - 36px)
      margin-top: 36px
      background: $color-background
      .scrollContainer
        width: 100%
</style>