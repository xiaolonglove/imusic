<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input type="text" ref="query" v-model="text" placeholder="搜索音乐、歌单、歌手">
    <i class="icon-close-solid" v-show="!!text" @click.stop="emptyText"></i>
  </div>
</template>

<script type="text/ecmascript-6">
  import {debounce} from '@/common/js/util'
  export default {
    data() {
      return {
        text: ''
      }
    },
    mounted() {
      this.focus()
    },
    created() {
      this.$watch('text', debounce((newText) => {
        this.$emit('text', newText)
      }, 200))
    },
    methods: {
      emptyText() {
        this.text = ""
      },
      focus() {
        this.$refs.query.focus()
      },
      blur() {
        this.$refs.query.blur()
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    height: 40px
    padding: 0 24px
    padding-left: 38px
    border-radius: 6px
    input
      flex: 1
      margin: 0 5px
      line-height: 24px
      font-size: 14px
      outline: 0
      color: $color
    i
      color: #7d8490
</style>