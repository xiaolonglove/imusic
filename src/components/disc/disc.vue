<template>
  <transition name="slide">
    <div class="disc" v-show="showFlag">
      <div class="back-wrapper">
        <i-back :title="'歌单'" @hide="hide"></i-back>
      </div>
      <div class="tab-wrapper">
        <div class="tab">
          <div class="tab-left">
            <div class="item" :class="{active: tabRight == 1}" @click.stop="toggleTabRight(1)">推荐</div>
            <div class="item" :class="{active: tabRight == 2}" @click.stop="toggleTabRight(2)">最新</div>
          </div>
          <div class="tab-right">
            <div class="item" v-show="categoryName" @click.stop="removeTabCategoryHandle">{{categoryName}}</div>
            <i class="icon" :class="{'icon-cheveron-down': !showCategory, 'icon-cheveron-up': showCategory}" @click.stop="showCategoryHandle"></i>
          </div>
        </div>
        <disc-categories :tagList="tagList" :showCategory="showCategory"/>
      </div>
      <div class="list-wrapper">
        歌单
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {getDiscList, getDiscTag} from '@/api/disc'
  import iBack from '@/base/back/back'
  import discCategories from '@/components/discCategories/discCategories'

  const ERR_OK = 0
  export default {
    name: 'disc',
    data() {
      return {
        showFlag: true,
        isLoading: true,
        showCategory: false,
        categoryId: 0,
        categoryName: '国语',
        tagList: [],
        discList: [],
        tabRight: 1
      }
    },
    created() {
      this._getDiscTag()
      this._getDiscList({
        categoryId: 10000000,
        sortId: 1,
        ein: 29
      })
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
      sendRequest(state) {
        this.$emit('sendRequest', state || 0)
      },
      toggleTabRight(type) {
        this.tabRight = type
      },
      showCategoryHandle() {
        this.showCategory = !this.showCategory
      },
      removeTabCategoryHandle() {
        this.categoryName = ''
      },
      _getDiscTag() {
        getDiscTag().then((res) => {
          if (res.code === ERR_OK) {
            this.tagList = res.data.categories.slice(1)
            console.log(this.tagList);
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
      .tab
        position: relative;
        z-index: 2
        .item
          height: 36px
          padding: 0 12px
          text-align: center
          border: 1px solid #c9c9c9
          box-sizing: border-box
      .tab-left
        float: left
        display: flex
        margin-left: 6px
        .item:nth-child(1)
          border-right: 0
        .active
          background: $color-theme
          color: $color-background
          border-color: $color-theme
      .tab-right
        float: right
        margin-right: 6px
        display: flex
        .item
          position: relative
          text-align: left
          padding-right: 24px
          &:before
            content: '×'
            position: absolute
            right: 6px
            font-size: 18px
        .icon
          display: flex
          align-items: center
          height: 36px
          padding: 0 12px
    .list-wrapper
      width: 100%
      height: calc(100% - 72px)
      margin-top: 72px
      padding: 6px
      background: $color-background
</style>