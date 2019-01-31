<template>
  <div id="app">
    <i-header></i-header>
    <div class="container">
      <router-view/>
    </div>
    <i-player></i-player>
  </div>
</template>

<script type="text/ecmascript-6">
  import iHeader from '@/components/header/header'
  import iPlayer from '@/components/player/player'
  export default {
    name: 'App',
    components: {
      iHeader,
      iPlayer
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  #app
    max-width()
    display: flex
    flex-direction: column
    margin: 0 auto
    .container
      height: calc(100% - 45px)
</style>
