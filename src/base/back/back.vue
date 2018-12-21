<template>
  <div class="back">
    <i class="icon-cheveron-left"></i>
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
    text-align: center
    background: $color-background
    .icon-cheveron-left
      display: inline-block
      float: left
      padding: 6px
      font-size: 24px
      width: 20px
      color: $color
    .title
      font-size: 15px
      font-weight: 600
      padding: 8px
      display: inline-block
</style>