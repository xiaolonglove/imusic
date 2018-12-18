<template>
  <div class="player" v-show="isPlayer">
    播放器
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'player',
    data() {
      return {
        isPlayer: false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .footer
    .player
      display: block
</style>