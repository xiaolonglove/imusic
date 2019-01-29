<template>
   <div class="list-mask" @click="hide" v-show="showFlag && playList.length">
    <transition name="fold">
      <div class="play-list" @click.stop="1" v-show="showFlag && playList.length">
        <div class="list-header">
          <h1 class="title">播放列表</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="item" v-for="(item,key) in playList" :key="key" @click="selectItem(item,index)">
              <i class="current" :class="getCurrentIcon(item)"></i>
              <span class="text">{{item.name}}</span>
              <span @click.stop="toggleFavorite(item)" class="like">
                <!-- <i :class="getFavoriteIcon(item)"></i> -->
              </span>
              <span @click.stop="deleteOne(item)" class="delete">
                <i class="icon-delete"></i>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import iScroll from '@/base/scroll/scroll'

  export default {
    name: 'playlist',
    props: {
      playList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        showFlag: false,
        list: []
      }
    },
    computed: {

    },
    watch: {
      song(newSong, oldSong) {
        console.log(newSong);
      }
    },
    created() {

    },
    methods: {
      show() {
        this.showFlag = true
      },
      hide() {
        this.showFlag = false
      },
      push(song) {
        console.log(song);
      },
      empty() {

      },
      deleteOne(item) {
        // this.deleteSong(item)
        if (!this.playlist.length) {
          this.hide()
        }
      },
      selectItem(item, index) {
        // if (this.mode === playMode.random) {
        //   index = this.playlist.findIndex((song) => {
        //     return song.id === item.id
        //   })
        // }
        // this.setCurrentIndex(index)
        // this.setPlayingState(true)
      },
      getCurrentIcon(item) {
        // if (this.currentSong.id === item.id) {
        //   return 'icon-play'
        // }
        return ''
      },
    },
    components: {
      iScroll,
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  .fold-enter-active, .fold-leave-active
    transition: all 0.3s
  .fold-enter, .fold-leave-to
    transform: translate3d(0, 100%, 0)
  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 120
    background: rgba(7,17,27,0.8)
    .play-list
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)
      .list-content
        min-height: 30px
        max-height: 376px
        padding: 0 18px 18px 5px
        overflow: hidden
        background: #fff
        ul
          position: relative
        ul:before
          content: "--- 我是有底线的 ---"
          position: absolute
          display: inline-block
          width: 120px
          bottom: -30px
          left: 0
          right: 0
          margin: 0 auto
          text-align center
          font-size: .5rem
          color: #d6cfcf
        .item
          position: relative
          padding: 12px 0
          box-sizing: border-box
          text-align: left;
          border-1px(rgba(7, 17, 27, 0.1))
          .current
            flex: 0 0 20px
            width: 20px
            font-size: $font-size-small
            color: $color-theme-d
          .text
            flex: 1
            no-wrap()
            font-size: $font-size-medium
            color: $color-text-d
          .like
            extend-click()
            margin-right: 15px
            font-size: $font-size-small
            color: $color-theme
            .icon-favorite
              color: $color-sub-theme
          .delete
            extend-click()
            font-size: $font-size-small
            color: $color-theme
</style>