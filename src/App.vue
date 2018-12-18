<template>
  <div id="app">
    <i-header></i-header>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import iHeader from '@/components/header/header'
  export default {
    name: 'App',
    components: {
      iHeader
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  #app
    display: flex
    flex-direction: column
    .container
      height: calc(100% - 45px)
</style>
