<template>
  <div class="back">
    <i class="icon-cheveron-left" @click="hide"></i>
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
    methods: {
      hide() {
        this.$emit('hide')
      }
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .back
    width: 100%
    height: 100%
    text-align: center
    background: $color-background
    .icon-cheveron-left
      display: inline-block
      position: absolute
      left: 0
      top: 50%
      transform: translateY(-50%)
      width: 38px
      padding: 6px 0
      font-size: 24px
      text-align: center
    .title
      font-size: 15px
      font-weight: 600
      display: inline-block
</style>