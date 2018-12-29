<template>
  <transition name="search-slide">
    <div class="search" v-if="showFlag">
      <div class="back-wrapper">
        <div class="back">
          <i class="icon-cheveron-left" @click.stop="hide"></i>
          <searchbox @text="onQueryChange" />
        </div>
      </div>
      <div class="content-wrapper">
        <i-scroll ref="shortcut" class="shortcut" :data="shortcut">
          <div>
            <div class="hot-key">
              <h1 class="title">热门搜索</h1>
              <ul>
                <li class="item" v-for="(item,i) in hotKey" :key="i">
                  <span>{{item.k}}</span>
                </li>
              </ul>
            </div>
            <!-- <div class="search-history" v-show="searchHistory.length">
              <h1 class="title">
                <span class="text">搜索历史</span>
                <span @click="showConfirm" class="clear">
                  <i class="icon-clear"></i>
                </span>
              </h1>
            </div> -->
          </div>
        </i-scroll>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {getHotKey} from '@/api/search'
  import iScroll from '@/base/scroll/scroll'
  import searchbox from '@/base/searchbox/searchbox'
  export default {
    data() {
      return {
        showFlag: false,
        hotKey: [],
        searchHistory: []
      }
    },
    created() {
      this._getHotKey()
    },
    computed: {
      shortcut() {
        return this.hotKey.concat(this.searchHistory)
      }
    },
    methods: {
      hide() {
        this.showFlag = false
      },
      show() {
        this.showFlag = true
      },
      onQueryChange(text) {
        console.log(text)
      },
      _getHotKey() {
        getHotKey().then((res) => {
          if (res.code === 0) {
            this.hotKey = res.data.hotkey.slice(0, 10)
          }
        })
      },
    },
    components: {
      iScroll,
      searchbox
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .search-slide-enter-active, .search-slide-leave-active
    transition: all 0.4s
    .back-wrapper
      transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
    .hot-key
      transition: all 0.4s
  .search-slide-enter, .search-slide-leave-to
    opacity: 0
    .back-wrapper
      transform: translate3d(0, -50px, 0)
    .hot-key
      transform: translate3d(500px, 0, 0)
  .search
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index: 20
    background: $color-background
    transition: all 0.2s linear
    .back-wrapper
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      height: 36px
      line-height: 36px
      z-index: 10
      .back
        width: 100%
        height: 100%
        text-align: center
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
        .title
          font-size: 15px
          font-weight: 600
          display: inline-block
    .content-wrapper
      box-sizing: border-box
      width: 100%
      height: calc(100% - 36px)
      padding: 0 5px
      margin-top: 36px
      background: $color-background
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          padding: 18px
          .title
            padding-bottom: 12px
            font-size: $font-size-small
            color: $color-text-weak
            text-align: left
          .item
            float: left
            display: inline-block
            padding: 4px 10px
            margin: 0 18px 10px 0
            border-radius: 8px
            font-size: $font-size-medium
            border: 1px solid $color-border
            color: $color
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
</style>