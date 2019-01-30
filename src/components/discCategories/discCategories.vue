<template>
  <transition name="disc">
    <i-scroll
      :data="tagList"
      class="discCategories"
      :class="{'animate-height': showCategory}"
      v-if="showCategory"
    >
      <ul class="categories-ul contentWrapper baseline">
        <li class="categories-li" v-for="(group,i) in tagList" :key="i">
          <div class="group-title">{{group.categoryGroupName}}</div>
          <ul class="group-ul">
            <li v-for="item in group.items" v-preventRepeatClick="3000" @click.stop="selectCategories($event,item)" :key="item.categoryId">{{item.categoryName}}</li>
          </ul>
        </li>
      </ul>
    </i-scroll>
  </transition>
</template>

<script type="text/ecmascript-6">
  import iScroll from '@/base/scroll/scroll'
  export default {
    props: {
      tagList: {
        type: Array,
        default: []
      },
      showCategory: {
        type: Boolean,
        default: false
      },
    },
    methods: {
      selectCategories(event, item) {
        if (event.target.disabled) return
        this.$emit('selectCategories', item)
      }
    },
    components: {
      iScroll
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .disc-enter-active, .disc-leave-active
    transition: all 0.3s ease
  .disc-enter, .disc-leave-to
    transform: translateY(-100%)
  .discCategories
    position: absolute
    left: 0
    top: 74px
    width: 100%
    height: 100%
    background: $color-background-line
    border-bottom: 1px solid $color-background-line
    overflow: hidden
    .categories-ul
      padding-top: 6px
      padding-bottom: 120px
      .categories-li
        display: flex
        flex-direction: row
        margin-bottom: 6px
        border: 1px solid $color-background-line
        border-left: 0
        border-right: 0
        .group-title
          width: 66px;
          display: flex;
          justify-content: center;
          align-items: center
          background: $color-background
        .group-ul
          flex: 1
          li
            float: left
            width: 33.33%
            padding: 12px 0
            text-align: center
            border: 1px solid $color-background-line
            box-sizing: border-box
            border-bottom: 0
            border-right: 0
            white-space: nowrap
            overflow: hidden
            background: $color-background
            &:nth-child(1),&:nth-child(2),&:nth-child(3)
              border-top: 0

  /* .animate-height
    animation: height1 .8s ease
  @keyframes height1 {
    0% {
      height: 0;
    }
    100% {
      height: 100%;
    }
  }
  @keyframes height2 {
    0% {
      height: 100%;
    }
    100% {
      height: 0;
    }
  } */
</style>