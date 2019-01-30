<template>
   <div class="list-mask" @click="hide" v-show="showFlag && playList.length">
    <transition name="fold">
      <div class="play-list" @click.stop="1" v-show="showFlag && playList.length">
        <div class="list-header border-1px">
          <h1 class="title">播放列表</h1>
          <span class="empty" @click="clickEmpty">清空</span>
        </div>
        <i-scroll class="list-content" ref="listContent" :data="playList">
          <ul class="baseline">
            <li class="item" ref="liItem" :class="aciveCls(item.id)" v-for="(item,i) in playList" :key="i" @click="selectSong(item,i)">
              <div class="left">{{sort(i+1)}}</div>
              <div class="right border-1px">
                <div class="icon">
                  <span class="name">{{item.name}}</span>
                  <span class="desc">{{item.singer}}</span>
                </div>
                <div class="delete" @click.stop="deleteOne(item)">
                  <i class="icon-clear"></i>
                </div>
              </div>
            </li>
          </ul>
        </i-scroll>
        <div @click="hide" class="list-footer border-1px">
          <i class="icon-cheveron-down"></i>
        </div>
      </div>
    </transition>
    <i-confirm ref="confirm" @confirm="confirmClear" text="是否清空播放列表" confirmBtnText="清空" />
  </div>
</template>

<script type="text/ecmascript-6">
  import iScroll from '@/base/scroll/scroll'
  import iConfirm from '@/base/confirm/confirm'

  export default {
    name: 'playlist',
    props: {
      playList: {
        type: Array,
        default() {
          return []
        },
      },
      currentSong: {
        type: Object,
        default() {
          return null
        },
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
      currentSong(newSong, oldSong) {
        if (!this.showFlag || newSong.id === oldSong.id) {
          return
        }
        // this.scrollToCurrent(newSong)
      },
    },
    created() {

    },
    methods: {
      show() {
        this.showFlag = true
        setTimeout(() => {
          this.$refs.listContent.refresh()
          this.scrollToCurrent(this.currentSong)
        }, 20)
      },
      hide() {
        this.showFlag = false
      },
      push(song) {
        console.log(song);
      },
      deleteOne(item) {
        // this.deleteSong(item)
        if (!this.playlist.length) {
          this.hide()
        }
      },
      selectSong(item, index) {
        this.$emit('selectSong', item)
        // if (this.mode === playMode.random) {
        //   index = this.playlist.findIndex((song) => {
        //     return song.id === item.id
        //   })
        // }
        // this.setCurrentIndex(index)
        // this.setPlayingState(true)
      },
      clickEmpty() {
        this.$refs.confirm.show()
      },
      confirmClear() {
        this.$emit('empty', 1)
        this.hide()
      },
      sort(i) {
        return i<10? '0'+i: i
      },
      aciveCls(id) {
        if(id === this.currentSong.id) return 'active'
        return ''
      },
      scrollToCurrent(currentSong) {
        const index = this.playList.findIndex((song) => {
          return currentSong.id === song.id
        })
        this.$refs.listContent.scrollToElement(this.$refs.liItem[index], 300)
      },
    },
    components: {
      iScroll,
      iConfirm
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
    background: $color-background-mask
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
        max-height: 398px
        // padding: 6px
        box-sizing: border-box
        overflow: hidden
        background: #fff
        ul
          position: relative
        .item
          position: relative
          // padding: 6px 0
          text-align: left
          display: flex
          flex-direction: row
          .left
            width: 45px
            height: 40px
            line-height: 40px
            text-align: center
          .right
            flex: 1
            border-1px($color-border)
            display: flex
            flex-direction: row
            .icon
              flex: 1
              display: flex
              flex-direction: column
              padding: 3px
              overflow: hidden
              .name
                no-wrap()
                flex: 1
                font-size: $font-size-medium
                color: $color
              .desc
                no-wrap()
                padding: 3px 0
                color: $color-text-weak
            .delete
              width: 45px
              height: 40px
              line-height: 40px
              text-align: center
              margin-right: 6px
              font-size: $font-size-small
          &.active
            .left
              color: $color-theme
            .right
              .icon
                .name, .desc
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
        i
          font-size: 24px
          position: relative
          top: 6px
</style>