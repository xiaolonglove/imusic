<template>
  <transition name="slide">
    <div class="radio
    " v-show="showFlag" ref="radio
    ">
      <div class="back-wrapper" @click="hide">
        <i-back :title="'电台'"></i-back>
      </div>
      <div class="list-wrapper">
        <!-- <div class="tabsContainer"> -->
        <i-scroll
          v-show="radioLists.length"
          :scroll-x="scrollX"
          :scroll-y="scrollY"
          :data="radioLists"
          class="tabsContainer"
        >
          <ul class="list-tabs">
            <li class="tab border-1px" :class="{tabActive: tabType == item.type}"
            @click="selectTab(item.type)"
            v-for="item in radioLists" :key="item.type"
            >
              {{item.name}}
            </li>
          </ul>
        </i-scroll>
        <!-- </div> -->
        <i-scroll
        v-show="radios.length"
        :data="radios"
        class="scrollContainer">
          <ul class="list-content">
            <li class="item" v-for="(item,i) in radios" :key="i">
              <div class="icon">
                <img v-lazy="item.radioImg">
                <span class="listennum">{{itemlistennum(item.listenNum)}}</span>
                <p class="desc" v-html="item.radioName"></p>
              </div>
            </li>
          </ul>
        </i-scroll>
      </div>
    </div>
    
  </transition>
</template>

<script type="text/ecmascript-6">
  import {getRadioList} from '@/api/recommend'
  import iScroll from '@/base/scroll/scroll'
  import iBack from '@/base/back/back'

  const ERR_OK = 0

  export default {
    name: 'radio',
    props: {
      radioLists: {
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
        scrollX: true,
        scrollY: false,
        lists: this.radioLists,
        showFlag: true,
        tabType: 24 //热门的type默认值为24
      }
    },
    computed: {
      radios() {
        let obj
        const type = this.tabType
        this.lists.forEach(item => {
          if(item.type == type) {
            obj = item
          }
        })
        if(!!obj) {
          this.tabType = obj.type
          return obj.radioList
        }
        return []
      }
    },
    created() {
      this.probeType = 1
      this.listenScroll = true
      if(!!this.radioLists) {
        // 父组件没有传值，需要发送请求
        this._getRadioList()
      }
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
      selectTab(type) {
        if(this.tabType === type) return false
        this.tabType = type
      },
      itemlistennum(num) {
        num += ""
        const len = num.length
        return (len > 4)? num.slice(0, len-4) + "万": num
      },
      sendRequest(state) {
        this.$emit('sendRequest', state || 0)
      },
      _getRadioList() {
        this.sendRequest(1)
        getRadioList().then((res) => {
          if (res.code === ERR_OK) {
            this.sendRequest(0)
            this.lists = res.data.data.groupList
          }
        }).catch((err) => {
          this.sendRequest(0)
          this.lists = []
        });
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
  @import "../../common/stylus/mixin.styl"

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .radio
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
      line-height: 36px
      z-index: 10
    .list-wrapper
      display: flex
      width: 100%
      height: calc(100% - 36px)
      margin-top: 36px
      background: $color-background
      .tabsContainer
        width: 100%;
        height: 30px
        overflow: hidden;
        position: fixed;
        z-index: 10
        background: #f3f5f7
        .list-tabs
          display: inline-block
          height: 30px
          line-height: 30px
          padding-left: 8px
          white-space: nowrap
          li.tab
            display: inline-block
            box-sizing: border-box
            flex-shrink: 0
            width: 36px
            height: 100%
            margin: 0 6px
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
          padding: 5px
          // text-align: center
          li.item
            box-sizing: border-box
            flex-shrink: 0
            padding: 6px
            width: 92px
            height 92px
            display: inline-block
            position: relative
            .icon
              width: 100%
              img
                width: 100%
                border-radius: 50%
              .desc
                text-align: center
                padding: 5px 0
                overflow: hidden
                white-space: nowrap
              .listennum
                position: absolute
                bottom: 15px
                color: $color-background
                left: 50%
                transform: translateX(-50%)
            &:before
              content: ""
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
</style>