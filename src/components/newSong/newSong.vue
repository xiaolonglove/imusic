<template>
  <transition name="slide">
    <div class="musiclist
    " v-show="showFlag" ref="musiclist
    ">
      <div class="back-wrapper" @click="hide">
        <i-back :title="'新歌首发'"></i-back>
      </div>
      <div class="list-wrapper">
        <ul class="list-tabs" ref="newsongTab">
          <li ref="newsongItem" class="tab border-1px" :class="{tabActive: tabType == i}"
          @click="selectTab(i)"
          v-for="(item,i) in newsongTabs" :key="i"
          >
            {{item.title}}
          </li>
        </ul>
        <i-scroll
        :data="songList"
        v-show="showFlag"
        class="scrollContainer"
        ref="scrollContainer">
          <ul class="list-content" ref="newsongUl">
            <li ref="newsongItem" class="item"  v-for="(item,i) in songList" :key="i">
              <div class="icon">
                <p class="name" v-html="newsongName(item.name, item.subtitle)"></p>
                <p class="desc" v-html="newsongSingerName(item.singer)"></p>
              </div>
              <i class="icon-dots-horizontal-triple"></i>
            </li>
          </ul>
        </i-scroll>
      </div>
    </div>
    
  </transition>
</template>

<script type="text/ecmascript-6">
  import {getNewSongList} from '@/api/recommend'
  import iScroll from '@/base/scroll/scroll'
  import iBack from '@/base/back/back'

  const ERR_OK = 0

  export default {
    name: 'musiclist',
    props: {
      newsongList: {
        type: Array,
        default: []
      },
      newsongTabs: {
        type: Array,
        default: []
      },
    },
    data() {
      return {
        songList: this.newsongList,
        showFlag: true,
        tabType: 0
      }
    },
    created() {
      this.probeType = 1
      this.listenScroll = true
      if(!!this.newsongList) {
        // 父组件没有传值，需要发送请求
        this._getNewSongList()
      }
    },
    methods: {
      show() {
        this.showFlag = true
      },
      hide() {
        this.showFlag = false
        setTimeout(() => {
          this.$router.push({
            path: '/recommend'
          })
        }, 300);
      },
      selectTab(i) {
        if(this.tabType === i) return false
        this.tabType = i
        this.$emit('sendRequest', 1)
        this._getNewSongList(i)
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
        getNewSongList(i).then((res) => {
          this.$emit('sendRequest', 0)
          this.songList = res.new_song.data.song_list || []
        }).catch((err) => {
          this.$emit('sendRequest', 0)
          this.songList = []
        });
      },
    },
    components: {
      iBack,
      iScroll,
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
    z-index: 10;
    transition: all 0.2s linear
    -webkit-transition: all 0.2s linear
    .back-wrapper
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      height: 36px
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
        background: #f3f5f7
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
              font-size: 20px
              align-items: center
              justify-content: center
</style>