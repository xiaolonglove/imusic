<template>
  <transition name="food-move">
    <div class="singer" v-show="showFlag" ref="singer">
      <div class="back-wrapper" @click="hide">
        <i-back></i-back>
      </div>
      <div class="list-wrapper">
        歌手
        <!-- <list-view  ref="list" :data="singers" @select="selectSinger"></list-view> -->
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  // import ListView from '@/base/listview/listview'
  import {getSingerList} from '@/api/singer'
  import {ERR_OK} from '@/api/config'
  import iBack from '@/base/back/back'

  const HOT_SINGER_LEN = 10
  const HOT_NAME = '热门'

  export default {
    name: 'singer',
    data() {
      return {
        singers: [],
        showFlag: false
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
      show() {
        this.showFlag = true
      },
      hide() {
        this.showFlag = false
      },
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = this._normalizeSinger(res.data.list)
          }
        })
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          const singer = this.singer(item.Fsinger_mid, item.Fsinger_name);
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(singer)
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(singer)
        })
        // 为了得到有序列表，我们需要处理 map
        let ret = []
        let hot = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },
      singer(id, name) {
        return {
          id: id,
          name: name,
          avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
        }
      }
    },
    components: {
      iBack,
      // ListView
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .singer
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    transition: all 0.2s linear
    -webkit-transition: all 0.2s linear
    &.food-move-enter
      transform: translate3d(100%, 0, 0)
    &.food-move-leave, .food-move-leave-to
      transform: translate3d(100%, 0, 0)
    .back-wrapper
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      height: 36px
    .list-wrapper
      width: 100%
      height: calc(100% - 36px)
      margin-top: 36px
      background: $color-background
</style>