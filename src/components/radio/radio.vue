<template>
  <transition name="slide">
    <div class="radio" v-show="showFlag" ref="radio">
      <div class="back-wrapper">
        <i-back :title="'电台'" @hide="hide"></i-back>
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
            <li class="tab" :class="{tabActive: tabType == item.type}"
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
          <ul class="list-content contentWrapper baseline">
            <li class="item" v-for="(item,i) in radios" :key="i">
              <div class="icon">
                <img v-lazy="item.radioImg" :key="item.radioImg">
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
          // this.$router.go(-1)
          this.$router.push('./recommend')
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
    max-width()
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index: 10
    background: $color-background
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
      .tabsContainer
        .list-tabs
          width: 60px
          li.tab
            width: 100%;
            height: 50px;
            line-height: 50px;
            text-align: center
            position: relative
            &.tabActive
              color: $color-theme
              &::after
                display: block
                position: absolute
                left: 0
                bottom: 0
                height: 100%
                border-left: 1px solid $color-theme
                content: ''
                color: $color-theme
      .scrollContainer
        width: 100%
        padding: 6px
        padding-top: 12px
        overflow: hidden
        .list-content
          width: 100%
          li.item
            box-sizing: border-box
            flex-shrink: 0
            padding: 12px
            width: 33.3%
            display: inline-block
            position: relative
            margin-bottom: 18px
            .icon
              width: 100%
              padding-top: 100%
              position: relative
              img
                width: 100%
                border-radius: 50%
                position: absolute
                left: 0
                top: 0
              .desc
                position: absolute
                bottom: -24px
                left: 50%
                transform: translateX(-50%)
                width: 100%
                padding: 6px
                text-align: center
                overflow: hidden
                white-space: nowrap
              .listennum
                position: absolute
                bottom: 6px
                color: $color-background
                left: 50%
                transform: translateX(-50%)
                no-wrap()
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