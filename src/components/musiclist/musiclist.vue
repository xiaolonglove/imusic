<template>
  <transition name="slide">
    <div class="musiclist
    " v-show="showFlag" ref="musiclist
    ">
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
        <i-scroll
          :data="songList"
          v-show="showFlag"
          class="scrollContainer"
        >
          <i-list @selectmusic="selectmusic" :list="songList" />
        </i-scroll>
      </div>
    </div>
    
  </transition>
</template>

<script type="text/ecmascript-6">
  import {getNewSongList} from '@/api/recommend'
  import iScroll from '@/base/scroll/scroll'
  import iList from '@/base/list/list'

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
        tabs: ['本地音乐', '收藏音乐', '最近播放' ]
      }
    },
    watch: {
      '$route' (to, from) {
        console.log(from, to);
      }
    },
    created() {
      console.log(this.selectTabtype);
      // this._getNewSongList()
    },
    methods: {
      show() {
        this.showFlag = true
      },
      hide() {
        this.showFlag = false
        setTimeout(() => {
          this.$router.go(-1)
        }, 300)
      },
      selectmusic(item) {
        console.log(item);
      },
      selectTab(i) {
        if(this.tabType === i) return false
        this.tabType = i
        switch (i) {
          case 0:
            this.songList = []
            break;
          case 1:
            this._getNewSongList(i)
            break;
          case 2:
            this.songList = []
            break;
          default:
            break;
        }
      },
      newsongName(name, subtitle) {
        return !!subtitle? name + " " + subtitle: name
      },
      newsongSingerName(singerList) {
        let ret = []
        if (!singerList) {
          return ''
        }
        singerList.forEach((s) => {
          ret.push(s.name)
        })
        return ret.join('/')
      },
      newsongItemImg(mid) {
        const url = 'https://y.gtimg.cn/music/photo_new/T002R90x90M000'+ mid +'.jpg?max_age=2592000'
        return url
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
          this.songList = []
        });
      },
      sendRequest(state) {
        this.$emit('sendRequest', state || 0)
      },
    },
    components: {
      iScroll,
      iList
    }
  }
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .musiclist
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index: 10;
    transition: all 0.2s linear
    -webkit-transition: all 0.2s linear
    .back-wrapper
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
        left: 6px
        top: 50%
        transform: translateY(-50%)
        width: 38px
        font-size: 24px
        text-align: left
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