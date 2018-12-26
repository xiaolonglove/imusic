<template>
  <div class="nothing">
    <i class="nothing-img" :class="iconClass"></i>
    <span class="nothing-desc">暂时没有内容</span>
    <router-link tag="span" class="nothing-to" :to="toPath">
      去{{toName}}看看
    </router-link>
  </div>
</template>
<script type="text/ecmascript-6" >
  export default {
    props: {
      iconClass:{
        type: String,
        default: 'icon-heart'
      },
      toPath: {
        type: String,
        default: '/recommend'
      },
      toName: {
        type: String,
        default: '推荐'
      },
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .nothing
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    display: flex
    flex-direction: column
    text-align: center
    .nothing-img
      font-size: 60px
    .nothing-desc
      margin: 30px 0 10px 0
      color: $color-text-weak
    .nothing-to
      font-size: 16px
      color: $color-theme 
</style>
