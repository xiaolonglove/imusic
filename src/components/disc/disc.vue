<template>
  <transition name="slide">
    <div class="disc" v-show="showFlag">
      <div class="back-wrapper">
        <i-back :title="'歌单'" @hide="hide"></i-back>
      </div>
      <div class="tab-wrapper">
        <div class="tab">
          <ul class="tab-left">
             <li class="item" v-for="(sort,i) in allsorts" :key="i" :class="{active: tabId === sort.sortId}" @click.stop="toggleTabRight(sort.sortId)">{{sort.sortName}}</li>
          </ul>
          <div class="tab-right">
            <div class="item active" v-show="categoryName" @click.stop="removeTabCategoryHandle">{{categoryName}}</div>
            <i class="icon" :class="{'icon-cheveron-down': !showCategory, 'icon-cheveron-up': showCategory}" @click.stop="showCategoryHandle"></i>
          </div>
        </div>
      </div>
      <div class="list-wrapper">
        <i-scroll
          :data="discList"
          class="ulbox"
        >
          <disc-list  @selectDisclist="selectDisclist" :list="discList" />
          <disc-categories @selectCategories="selectCategories" :tagList="tagList" :showCategory="showCategory"/>
        </i-scroll>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {getDiscList, getDiscTag} from '@/api/disc'
  import iBack from '@/base/back/back'
  import iScroll from '@/base/scroll/scroll'
  import discList from '@/base/disclist/disclist'
  import discCategories from '@/components/discCategories/discCategories'

  const defaultAllsorts = [
    {sortId: 1,sortName: "推荐"},
    {sortId: 2,sortName: "最新"}
  ]
  const defaultParams = {
    categoryId: 10000000,
    sortId: 1,
    ein: 29
  }
  const ERR_OK = 0
  export default {
    name: 'disc',
    data() {
      return {
        showFlag: true,
        isLoading: true,
        showCategory: false,
        categoryId: 0,
        categoryName: '',
        tagList: [],
        discList: [],
        allsorts: defaultAllsorts,
        tabId: 1,
        defaultParams: defaultParams
      }
    },
    created() {
      this._getDiscTag()
      this._getDiscList(this.defaultParams)
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
      selectCategories(item) {
        const sortId = item.allsorts[0].sortId
        this.showCategory = false
        this.categoryName = item.categoryName
        this.categoryId = item.categoryId
        this.tabId = sortId
        this.allsorts = item.allsorts
        this._getDiscList({
          categoryId: item.categoryId,
          sortId: sortId,
          ein: 29
        })
      },
      selectDisclist() {
        console.log("选择了歌单")
      },
      sendRequest(state) {
        this.$emit('sendRequest', state || 0)
      },
      toggleTabRight(sortId) {
        this.tabId = sortId
        this._getDiscList({
          categoryId: this.categoryId,
          sortId: sortId,
          ein: 29
        })
      },
      showCategoryHandle() {
        this.showCategory = !this.showCategory
      },
      removeTabCategoryHandle() {
        this.categoryName = ''
        this.categoryId = 0
        this.tabId = 1
        this.allsorts = defaultAllsorts
        this._getDiscList(this.defaultParams)
      },
      _getDiscTag() {
        getDiscTag().then((res) => {
          if (res.code === ERR_OK) {
            this.tagList = res.data.categories.slice(1)
          }
        })
      },
      _getDiscList(params) {
        this.sendRequest(1)
        getDiscList(params).then((res) => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list
            this.sendRequest(0)
          }
        }).catch((err) => {
          this.sendRequest(0)
        })
      },
    },
    components: {
      iBack,
      iScroll,
      discList,
      discCategories,
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .disc
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index: 10
    background: $color-background
    transition: all 0.2s linear
    -webkit-transition: all 0.2s linear
    .back-wrapper, .tab-wrapper
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      height: 36px
      line-height: 36px
      background: $color-background
      z-index: 10
    .tab-wrapper
      top: 36px
      padding-bottom: 2px
      .tab
        position: relative;
        z-index: 2
        .item
          height: 36px
          padding: 0 12px
          text-align: center
          border: 1px solid $color-border
          box-sizing: border-box
      .tab-left
        float: left
        display: flex
        margin-left: 6px
        .item:nth-child(1)
          border-right: 0
      .tab-right
        float: right
        height: 36px
        margin-right: 6px
        display: flex
        align-items: flex-end
        .item
          position: relative
          text-align: left
          height: 30px
          line-height: 30px
          padding-right: 24px
          &:before
            content: '×'
            position: absolute
            right: 6px
            font-size: 18px
        .icon
          line-height: 30px
          padding: 0 12px
      .active
        background: $color-theme
        color: $color-background
        border-color: $color-theme
    .list-wrapper
      width: 100%
      height: calc(100% - 72px)
      margin-top: 78px
      overflow: hidden
      background: $color-background
      .ulbox
        width: 100%
        height: 100%
</style>