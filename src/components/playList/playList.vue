<template>
   <div class="list-mask" @click="hide" v-show="showFlag && playList.length">
    <transition name="fold">
      <div class="play-list" @click.stop="1" v-show="showFlag && playList.length">
        <div class="list-header border-1px">
          <h1 class="title">播放列表</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <i-scroll class="list-content" ref="listContent" :data="playList">
          <ul class="baseline">
            <li class="item" v-for="(item,i) in playList" :key="i" @click="selectItem(item,i)">
              <div class="left">
                {{sort(i+1)}}
              </div>
              <div class="right border-1px">
                <i class="current" :class="getCurrentIcon(item)"></i>
                <span class="text">{{item.name}}</span>
                <span @click.stop="toggleFavorite(item)" class="like">
                  <!-- <i :class="getFavoriteIcon(item)"></i> -->
                </span>
                <span @click.stop="deleteOne(item)" class="delete">
                  <i class="icon-delete"></i>
                </span>
              </div>
            </li>
          </ul>
        </i-scroll>
        <div @click="hide" class="list-footer border-1px">关闭</div>
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
        setTimeout(() => {
          this.$refs.listContent.refresh()
          // this.scrollToCurrent(this.currentSong)
        }, 20)
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
      sort(i) {
        return i<10? '0'+i: i
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
      background: $color-background
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        border-1px($color-border)
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
        max-height: 374px
        padding: 6px
        box-sizing: border-box
        overflow: hidden
        background: #fff
        ul
          position: relative
        .item
          position: relative
          padding: 6px 0
          text-align: left
          display: flex
          flex-direction: row
          .left
            width: 30px
            height: 30px
            line-height: 30px
            text-align: center
          .right
            flex: 1
            border-1px($color-border)
            .current
              flex: 0 0 20px
              width: 20px
              font-size: $font-size-small
              color: $color
            .text
              flex: 1
              no-wrap()
              font-size: $font-size-medium
              color: $color
            .like
              extend-click()
              margin-right: 15px
              font-size: $font-size-small
              color: $color-theme
            .delete
              extend-click()
              font-size: $font-size-small
              color: $color-theme
      .list-footer
        height: 40px
        line-height: 40px
        padding: 0 18px
        text-align: center
        font-size: $font-size-medium-x
        border-1px($color-border)
        &:after
          top: 0
          bottom: 100%
</style>