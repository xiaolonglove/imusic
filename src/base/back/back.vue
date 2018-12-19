<template>
  <div class="back">
    <i class="icon-arrow-right"></i>
    <span class="title">{{title}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .back
    position: fixed
    top: 0
    left: 0
    width: 100%
    text-align: left
    background: $color-background
    .icon-arrow-right
      display: block
      padding: 8px 10px
      font-size: 20px
      color: $color
    .title
      font-size: 15px
      position: absolute
      top: 11px
      left: 40px
      font-weight: 600
</style>