<template>
  <div class="header">
    <div class="tab-item">
      <i class="icon-playlist"></i>
    </div>
    <router-link tag="div" class="tab-item" to="/mymusic">
      <span class="tab-link border-1px">我的</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="tab-link border-1px">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="tab-link border-1px">发现
      </span>
    </router-link>
    <div class="tab-item">
      <i class="icon-Search"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"

  .header
    display: flex
    height: 45px
    text-align: center
    font-size: 0
    .tab-item
      flex: 1
      margin: 0 10px
      i,span
        display: inline-block
        padding: 0 10px
        line-height: 45px
        color: $color-text-weak
        font-size: $font-size-medium-x
      .icon-playlist
        font-size: $font-size-large
        color: $color-text-m
      .icon-Search
        font-size: $font-size-g
        color: $color-text-m
    .tab-item:first-child
      text-align: left
      margin: 0
    .tab-item:last-child
      text-align: right
      margin: 0
    .router-link-active
      .tab-link
        border-1px($color-theme)
        color: $color-theme
</style>