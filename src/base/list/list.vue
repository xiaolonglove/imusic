<template>
  <ul class="list-content">
    <li class="item" v-for="(item,i) in list"  @click="selectmusic(item)" :key="i">
      <div class="icon">
        <p class="name" v-html="newsongName(item.name, item.subtitle)"></p>
        <p class="desc" v-html="newsongSingerName(item.singer)"></p>
      </div>
      <i class="icon-dots-horizontal-triple"></i>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'list',
    props: {
      list: {
        type: Array,
        default: []
      },
    },
    methods: {
      selectmusic(item) {
        this.$emit("selectmusic", item)
      },
      newsongName(name, subtitle) {
        return !!subtitle? name + " " + subtitle: name
      },
      newsongSingerName(singerList) {
        let ret = []
        if (!singerList) {
          return ''
        }
        singerList.forEach((s) => {
          ret.push(s.name)
        })
        return ret.join('/')
      }
    }
  }
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  .list-content
    display: inline-block
    width: 100%
    li.item
      display: flex
      flex-direction: row
      box-sizing: border-box
      width: 100%
      padding: 6px
      border-top: 1px solid $color-background-line;
      .icon
        width: calc(100% - 50px)
        position: relative
        padding-left: 12px
        img
          width: 100%
          border-radius: 5px
        p
          text-overflow: ellipsis
          white-space: nowrap
          overflow: hidden
        .name
          width: 100%
          height: 14px
          line-height: 14px
          padding: 2px 0
          border-bottom-right-radius: 6px
          border-bottom-left-radius: 6px
          color: $color
          font-weight: 600
        .desc
          padding: 3px 0
          color: $color-text-weak
          width: 100%
      i
        width: 40px
        display: flex
        font-size: 20px
        align-items: center
        justify-content: center
        color: $color-text-weak
</style>