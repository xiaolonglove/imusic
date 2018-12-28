<template>
  <div id="app">
    <i-header></i-header>
    <div class="container">
      <router-view/>
    </div>
    <i-player :songPlay="songPlay"></i-player>
  </div>
</template>

<script type="text/ecmascript-6">
  import iHeader from '@/components/header/header'
  import iPlayer from '@/components/player/player'
  export default {
    name: 'App',
    data() {
      return {
        songPlay: {
          album:"绅士",
          duration:261,
          id:102636799,
          image:"https://y.gtimg.cn/music/photo_new/T002R300x300M000003y8dsH2wBHlo.jpg?max_age=2592000",
          mid:"001Qu4I30eVFYb",
          name:"演员",
          singer:"薛之谦",
          url:"http://ws.stream.qqmusic.qq.com/102636799.m4a?fromtag=46",
        }
      }
    },
    components: {
      iHeader,
      iPlayer
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  #app
    display: flex
    flex-direction: column
    max-width: 800px
    margin: 0 auto
    .container
      height: calc(100% - 45px)
</style>
