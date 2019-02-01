<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {ERR_OK} from '@/api/config'
  import {getSingerDetail} from '@/api/singer'
  import {processSongsUrl} from '@/api/song'
  import {createSong} from '@/common/js/song'
  import MusicList from '@/components/musicList/musicList'

  export default {
    props: {
      singer: {
        type: Object,
        default: {
          id: null,
          avatar: '',
          name: '',
        }
      },
    },
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getDetail()
    },
    computed: {
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.avatar
      }
    },
    methods: {
      newsongName(name, subtitle) {
        return !!subtitle? name + " " + subtitle: name
      },
      _getDetail() {
        if (!this.singer.id) {
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            let ret = []
            res.data.list.forEach((item) => {
              let {musicData} = item
              if (musicData.songid && musicData.albummid) {
                // musicData.name = this.newsongName(musicData.songname, musicData.albumdesc)
                ret.push(createSong(musicData))
              }
            })
            processSongsUrl(ret).then((songs) => {
              this.songs = songs;
            });
          }
        })
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

