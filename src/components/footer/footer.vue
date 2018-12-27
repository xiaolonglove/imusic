<template>
  <div class="footer border-1px">
    <div class="footer-left">
      <div class="nothing" v-if="!songPlay">音乐 让生活充满快乐</div>
      <div class="content" v-if="!!songPlay">
        <img :class="{'animate-scan': isPlay}" v-lazy="songPlay.image">
        <div class="desc">
          <span class="singer">{{songPlay.singer}}</span>
          <span class="name">{{songPlay.name}}</span>
        </div>
      </div>
    </div>
    <div class="footer-right">
      <i @click.stop="togglePlay" :class="{'icon-play-outline': !isPlay, 'icon-pause-outline': !!isPlay}"></i>
      <i class="icon-playlist1"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      songPlay: {
        type: Object,
        default: null
      },
      isPlay: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      togglePlay() {
        // console.log(object);
      }
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  .footer
    display: flex
    flex-direction: row
    box-sizing: border-box
    width: 100%
    height: 40px
    padding: 0 8px
    text-align: center
    font-size: 0
    color: #000
    background: $color-background
    border-1px($color-background-line)
    position: fixed
    bottom: 0
    left: 0
    z-index: 100
    &:after
      top: 0
      bottom: 100%
      box-shadow: 0 -2px 6px $color-background-line
    .footer-left
      flex: 1
      width: 100%
      display: flex;
      align-items: center
      .content
        width: 100%
        height: 100%
        display: flex
        align-items: center
        img
          width: 30px
          height: 30px
          border-radius: 50%
          &.animate-scan
            animation: rotate1 6s linear infinite
        .desc
          width: 100%
          display: flex
          flex-direction: column
          align-items: left
          padding-left: 10px
          span
            font-size: $font-size-medium
            &.name
              color: $color-text-weak
              font-size: $font-size-small
              padding-top: 2px
      .nothing
        display: flex
        align-items: center
        height: 100%
        padding-left: 6px
        font-size: $font-size-medium
    .footer-right
      width: 80px
      display: flex
      align-items: center
      justify-content: center
      i
        flex: 1
        color: $color-theme
        font-size: 20px
        &:nth-child(1)
          position: relative
          top: 2px
        // &:nth-child(2)
  /* 顺时针旋转 */
  @keyframes rotate1 {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
  }
</style>