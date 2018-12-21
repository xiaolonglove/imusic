<template>
  <transition name="slide">
    <div class="musiclist
    " v-show="showFlag" ref="musiclist
    ">
      <div class="back-wrapper" @click="hide">
        <i-back :title="'电台'"></i-back>
      </div>
      <div class="list-wrapper">
        电台
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  // import {getSingerList} from '@/api/musiclist'
  import iBack from '@/base/back/back'

  const ERR_OK = 0
  // const HOT_SINGER_LEN = 10
  // const HOT_NAME = '热门'

  export default {
    name: 'musiclist',
    data() {
      return {
        showFlag: true
      }
    },
    created() {
      // this._getSingerList()
    },
    methods: {
      show() {
        this.showFlag = true
      },
      hide() {
        this.showFlag = false
        setTimeout(() => {
          this.$router.push({
            path: '/recommend'
          })
        }, 300);
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
    z-index: 10;
    transition: all 0.2s linear
    -webkit-transition: all 0.2s linear
    .back-wrapper
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      height: 36px
    .list-wrapper
      width: 100%
      height: calc(100% - 36px)
      margin-top: 36px
      background: $color-background
</style>