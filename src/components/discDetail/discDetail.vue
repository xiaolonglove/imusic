<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {getDiscInfo} from '@/api/recommend'
  import {ERR_OK} from '@/api/config'
  import {createSong} from '@/common/js/song'
  import MusicList from '@/components/musicList/musicList'

  export default {
    props: {
      disc: {
        type: Object,
        default() {
          return {
            dissname: '',
            imgurl: ''
          }
        }
      }
    },
    computed: {
      title() {
        if (!this.disc || !this.disc.dissname) {
          return ''
        }
        return this.disc.dissname
      },
      bgImage() {
        if (!this.disc || !this.disc.imgurl) {
          return ''
        }
        return this.disc.imgurl
      },
    },
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getDiscDetail()
    },
    methods: {
      _getDiscDetail() {
        if (!this.disc || !this.disc.dissid) {
          this.$router.push('/disc')
          return
        }
        getDiscInfo(this.disc.dissid).then((res) => {
          if (res.code === ERR_OK) {
            processSongsUrl(this._normalizeSongs(res.cdlist[0].songlist)).then((songs) => {
              this.songs = songs;
            });
          };
        });
      },
      _normalizeSongs(list) {
        let ret = [];
        list.forEach((item) => {
          if (item.songmid) {
            ret.push(createSong(item));
          };
        });
        return ret;
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>

