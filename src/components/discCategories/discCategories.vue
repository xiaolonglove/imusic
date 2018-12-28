<template>
  <!-- <transition name="disc"> -->
    <div class="discCategories" :class="{'animate-height': showCategory}" v-show="showCategory">
      种类
    </div>
  <!-- </transition> -->
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      tagList: {
        type: Array,
        default: []
      },
      showCategory: {
        type: Boolean,
        default: false
      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  // .disc-enter-active, .disc-leave-active
  //   animation: height1 .4s ease
  // .disc-enter, .disc-leave-to
  //   animation: height2 .4s ease
  .animate-height
    animation: height1 .4s ease
  .discCategories
    position: absolute
    width: 100%
    height: 180px
    margin-top: 36px
    padding: 6px
    background: $color-background
    border-bottom: 1px solid $color-border
    overflow: hidden
  @keyframes height1 {
    0% {
      height: 0;
    }
    100% {
      height: 180px;
    }
  }
  @keyframes height2 {
    0% {
      height: 180px;
    }
    100% {
      height: 0;
    }
  }
</style>