<template>
  <ul class="list-ul contentWrapper">
    <li @click="selectDisclist(item)" v-for="(item,i) in list" class="item" :key="i">
      <div class="icon">
        <img v-lazy="item.imgurl" :key="item.imgurl">
        <div class="detail">
          <i class="icon-headphones"></i>
          <span class="listennum">{{itemlistennum(item.listennum)}}</span>
        </div>
      </div>
      <p class="desc" v-html="item.dissname"></p>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'disclist',
    props: {
      list: {
        type: Array,
        default: []
      },
    },
    methods: {
      selectDisclist(item) {
        this.$emit("selectDisclist", item)
      },
      itemlistennum(num) {
        num += ""
        const len = num.length
        return (len > 4)? num.slice(0, len-4) + "万": num
      }
    }
  }
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .list-ul
    display: inline-block
    padding: 6px 6px 52px 6px
    li.item
      display: flex
      flex-direction: column
      box-sizing: border-box
      width: 33.33%
      float: left
      padding: 6px
      overflow: hidden
      .icon
        width: 100%
        padding-top: 100%
        position: relative
        overflow: hidden
        img
          width: 100%
          border-radius: 5px
          position: absolute
          left: 0
          top: 0
        .name
          position: absolute
          bottom: 2px
          left: 2px
          width: calc(100% - 2px)
          height: 14px
          line-height: 14px
          border-bottom-right-radius: 6px
          border-bottom-left-radius: 6px
          overflow: hidden
          background: rgba(0,0,0,.5)
          color: #fff
        .detail
          color: #fff
          font-size: $font-size-small-s
          display: inline-block
          position: absolute
          bottom: 3px
          left: 3px
          i
            font-size: $font-size-small-s
      .desc
        height: 30px;
        line-height: 15px
        padding-top: 5px
        overflow: hidden
        font-size: $font-size-small
        font-weight: 600
        color: $color
</style>