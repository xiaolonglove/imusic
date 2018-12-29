<template>
  <div class="header">
    <div class="tab-item">
      <i class="icon-menu"></i>
    </div>
    <router-link tag="div" class="tab-item" to="/mymusic">
      <span class="tab-link border-1px">我的</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="tab-link border-1px">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/discovery">
      <span class="tab-link border-1px">发现
      </span>
    </router-link>
    <div class="tab-item tab-search">
      <i class="icon-search" @click.stop="showSearchHandle"></i>
    </div>
    <search ref="search"/>
  </div>
</template>

<script type="text/ecmascript-6">
  import search from '@/components/search/search'
  export default {
    methods: {
      showSearchHandle() {
        this.$refs.search.show()
      },
    },
    components: {
      search
    }
  }
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
      margin: 0 6px
      i,span
        display: inline-block
        padding: 0 12px
        line-height: 45px
        color: $color-text-weak
        font-size: $font-size-medium-x
      .icon-playlist
        font-size: $font-size-large
        color: $color-text-m
      .icon-Search
        font-size: $font-size-g
        color: $color-text-m
      i
        padding: 0 18px
      &:first-child
        text-align: left
        margin: 0
    .tab-search
      text-align: right
      margin: 0
    .router-link-active
      .tab-link
        border-1px($color-theme)
        color: $color-theme
</style>