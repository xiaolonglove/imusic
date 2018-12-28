<template>
  <transition name="slide">
    <div class="top" v-show="showFlag">
      <div class="back-wrapper">
        <i-back :title="'排行榜'" @hide="hide"></i-back>
      </div>
      <i-scroll
        v-show="topLists.length"
        :data="topLists"
        class="list-wrapper"
      >
        <ul class="list-group contentWrapper">
          <li class="group" v-for="group in topLists" :key="group.GroupID">
            <div class="group-title">{{groupTitle(group.GroupName)}}</div>
            <ul class="group-ulbox">
              <li class="item" v-for="(item,i) in group.List" :key="i">
                <div class="item-left">
                  <div class="title">{{item.ListName}}</div>
                    <ul class="songlist-ulbox">
                      <li class="songlist-item" v-for="(song,j) in item.songlist.slice(0,3)" :key="j">
                        <span>{{(j+1) + ".  " +song.songname}}</span> - {{song.singername}}
                      </li>
                    </ul>
                </div>
                <div class="item-right">
                  <img v-lazy="item.pic_v12">
                  <div class="detail">
                    <i class="icon-headphones"></i>
                    <span class="listennum">{{itemlistennum(item.listennum)}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </i-scroll>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {getTopList} from '@/api/recommend'
  import iBack from '@/base/back/back'
  import iScroll from '@/base/scroll/scroll'

  const ERR_OK = 0
  export default {
    name: 'top',
    data() {
      return {
        showFlag: true,
        topLists: []
      }
    },
    created() {
      this._getTopList()
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
        }, 300);
      },
      sendRequest(state) {
        this.$emit('sendRequest', state || 0)
      },
      _getTopList() {
        this.sendRequest(1)
        getTopList().then((res) => {
          this.sendRequest(0)
          this.topLists = res;
        }).catch((err) => {
          this.sendRequest(0)
        })
      },
      itemlistennum(num) {
        num += ""
        const len = num.length
        return (len > 4)? num.slice(0, len-4) + "万": num
      },
      groupTitle(title) {
        return title.includes('QQ音乐')? title.slice(4, title.length): title
      }
    },
    components: {
      iBack,
      iScroll,
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .top
    left: 0
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index: 10
    transition: all 0.2s linear
    -webkit-transition: all 0.2s linear
    .back-wrapper
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      height: 36px
      line-height: 36px
      z-index: 10
    .list-wrapper
      box-sizing: border-box
      width: 100%
      height: calc(100% - 36px)
      padding: 0 5px
      margin-top: 36px
      background: $color-background
      .list-group
        // padding: 6px 0
        .group
          .group-title
            height: 36px
            line-height: 36px
            padding-left: 6px
            font-size: 16px
            font-weight: 600
          .group-ulbox
            .item
              background: $color-background-line
              display: flex
              flex-direction: row
              border-radius: 8px
              margin: 0 6px 12px 6px
              height: 112px
              overflow: hidden
              .item-left
                box-sizing: border-box
                width: calc(100% - 112px)
                padding: 12px
                .title
                  white-space: nowrap
                  overflow: hidden
                  padding-bottom: 14px
                  font-size: 14px
                  font-weight: 600
                .songlist-item
                  white-space: nowrap
                  overflow: hidden
                  padding-bottom: 10px
                  color: $color-text-weak
                  span
                    display inline-block
                    font-weight 600
                    color: $color
              .item-right
                width: 112px
                position: relative
                &:before
                  content: ''
                  display: inline-block
                  width: 0
                  height: 0
                  border-left: 20px solid rgba(255, 255, 255, .8)
                  border-top: 10px solid transparent
                  border-bottom: 10px solid transparent
                  position: absolute
                  z-index: 10
                  left: 50%
                  top: 50%
                  transform: translate3d(-50%, -50%, 0)
                img
                  width: 100%
                  height: 100%
                .detail
                  color: #fff
                  font-size: $font-size-small-s
                  display: inline-block
                  position: absolute
                  bottom: 3px
                  left: 3px
              
</style>