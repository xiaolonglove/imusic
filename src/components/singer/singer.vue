<template>
  <transition name="slide">
    <div class="singer" v-show="showFlag" ref="singer">
      <div class="back-wrapper" @click="hide">
        <i-back :title="'歌手'"></i-back>
      </div>
      <div class="list-wrapper">
        <singer-list ref="list" :data="singers"></singer-list>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {getSingerList} from '@/api/singer'
  import iBack from '@/base/back/back'
  import SingerList from '@/components/singerList/singerList'  

  const ERR_OK = 0
  const HOT_SINGER_LEN = 10
  const HOT_NAME = '热门'

  export default {
    name: 'singer',
    data() {
      return {
        singers: [],
        showFlag: true
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
        setTimeout(() => {
          this.$router.go(-1)
        }, 300)
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
      SingerList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .singer
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index: 10;
    transition: all 0.2s linear
    -webkit-transition: all 0.2s linear
    .back-wrapper
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      height: 36px
      line-height: 36px
    .list-wrapper
      width: 100%
      height: calc(100% - 36px)
      margin-top: 36px
      background: $color-background
</style>