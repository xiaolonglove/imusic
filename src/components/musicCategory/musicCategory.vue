<template>
  <transition name="slide">
    <div class="musiclist
    " v-show="showFlag" ref="musiclist
    ">
      <div class="back-wrapper">
        <i-back :title="'歌单分类'" @hide="hide"></i-back>
      </div>
      <div class="list-wrapper">
        歌单分类
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import iBack from '@/base/back/back'

  const ERR_OK = 0
  export default {
    name: 'musiclist',
    data() {
      return {
        showFlag: true
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
        setTimeout(() => {
          this.$router.go(-1)
        }, 300)
      },
    },
    components: {
      iBack,
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .musiclist
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
      width: 100%
      height: calc(100% - 36px)
      margin-top: 36px
      background: $color-background
</style>