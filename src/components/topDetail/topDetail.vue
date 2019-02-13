<template>
  <transition name="slide">
    <music-list :rank="true" :title="top.topTitle" :bg-image="topImg" :songs="songs"></music-list>
  </transition>
</template>
<script>
  import {getMusicList} from '@/api/top'
  import {ERR_OK} from '@/api/config'
  import {processSongsUrl} from '@/api/song'
  import {createSong} from '@/common/js/song'
  import MusicList from '@/components/musicList/musicList'
  export default {
    name: 'topDetail',
    props: {
      top: {
        type: Object,
        default() {
          return null
        }
      }
    },
    data() {
      return {
        songs: []
      };
    },
    created() {
      if (!this.top.topID && this.top.topID !== 0) {
        this.$router.push('/top')
      };
      this._getMusicList()
    },
    components: {
      MusicList
    },
    computed: {
      topImg() { // 返回列表第一张图
        if (this.songs.length) {
          return this.songs[0].image;
        } else {
          return '';
        }
      },
    },
    methods: {
      _getMusicList() {
        getMusicList(this.top.topID).then((res) => {
          if (res.code === ERR_OK) {
            processSongsUrl(this._normalizeSongs(res.songlist)).then((res) => {
              this.songs = res;
            });
          }
        });
      },
      _normalizeSongs(list) {
        let ret = [];
        list.forEach((item) => {
          if (item.data.albumid && item.data.songid) {
            ret.push(createSong(item.data));
          };
        });
        return ret;
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active{
    transition: all 0.3s ease;
  }
  .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0);
  }
</style>