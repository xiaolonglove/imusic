<template>
  <transition name="slide">
    <div class="musiclist
    " v-show="showFlag" ref="musiclist
    ">
      <div class="back-wrapper">
        <i-back :title="'新歌首发'" @hide="hide"></i-back>
      </div>
      <div class="list-wrapper">
        <ul class="list-tabs" ref="newsongTab">
          <li ref="newsongItem" class="tab border-1px" :class="{tabActive: tabType == item.id}"
          @click="selectTab(item)"
          v-for="(item,i) in newsongTabs" :key="i"
          >
            {{item.title}}
          </li>
        </ul>
        <i-scroll
          :data="songList"
          :listen-scroll="listenScroll"
          :probe-type="probeType"
          v-show="showFlag"
          class="scrollContainer"
          ref="scrollContainer"
        >
          <song-list @selectSong="selectSong" :list="songList" />
        </i-scroll>
      </div>
    </div>
    
  </transition>
</template>

<script type="text/ecmascript-6">
  import {getNewSongList} from '@/api/recommend'
  import {processSongsUrl} from '@/api/song'
  import iScroll from '@/base/scroll/scroll'
  import iBack from '@/base/back/back'
  import Bus from '@/common/js/bus'
  import {createSong} from '@/common/js/song'
  import songList from '@/base/songlist/songlist'

  const ERR_OK = 0

  export default {
    name: 'musiclist',
    props: {
      newsongTabs: {
        type: Array,
        default: []
      },
    },
    data() {
      return {
        songList: [],
        showFlag: true,
        tabType: 0
      }
    },
    created() {
      this.probeType = 1
      this.listenScroll = true
      this._getNewSongList()
    },
    methods: {
      show() {
        this.showFlag = true
      },
      hide() {
        this.showFlag = false
        setTimeout(() => {
          // this.$router.go(-1)
          this.$router.push('./recommend')
        }, 300)
      },
      selectTab(item) {
        const id = item.id;
        if(this.tabType === id) return false
        this.tabType = id
        this._getNewSongList(id)
      },
      selectSong(item, i) {
        Bus.$emit('selectSong', this.songList, i)
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
            let ret = []
            res.new_song.data.song_list.forEach((item) => {
              ret.push(createSong({
                songid: item.id,
                songmid: item.mid,
                singer: item.singer,
                songname: this.newsongName(item.name, item.subtitle),
                albumname: item.album.name,
                interval: item.interval,
                albummid: item.album.mid
              }))
            })
            processSongsUrl(ret).then((songs) => {
              this.songList = songs
            });
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
      iBack,
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
  .musiclist
    max-width()
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
      width: 100%
      height: 36px
      line-height: 36px
      z-index: 10
    .list-wrapper
      display: flex
      width: 100%
      height: calc(100% - 36px)
      margin-top: 36px
      background: $color-background
      .list-tabs
        width: 100%
        height: 30px
        line-height: 30px
        padding-left: 8px
        background: $color-background-line
        position: fixed
        z-index: 10
        li.tab
          float: left
          width: 36px
          margin: 0 6px
          box-sizing: border-box
          text-align: center
          &.tabActive
            border-1px($color-theme)
            color: $color-theme
      .scrollContainer
        width: 100%
        margin-top: 30px
        .list-content
          display: inline-block
          width: 100%
          li.item
            display: flex
            flex-direction: row
            box-sizing: border-box
            width: 100%
            padding: 6px
            border-top: 1px solid $color-background-line;
            .icon
              width: calc(100% - 50px)
              position: relative
              padding-left: 8px
              img
                width: 100%
                border-radius: 5px
              p
                text-overflow: ellipsis
                white-space: nowrap
                overflow: hidden
              .name
                width: 100%
                height: 14px
                line-height: 14px
                margin-top: 5px
                border-bottom-right-radius: 6px
                border-bottom-left-radius: 6px
                color: $color
                font-weight: 600
              .desc
                padding: 3px 0
                color: $color-text-weak
                width: 100%
            i
              width: 40px
              display: flex
              font-size: 18px
              align-items: center
              justify-content: center
</style>