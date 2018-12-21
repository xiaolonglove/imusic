import axios from 'axios'
import jsonp from '@/common/js/jsonp'

const ERR_RES = {
  code: 1,
  data: []
}

/* 
* {
    category: '种类',
    focus：焦点图
    new_album：新专辑
    new_song: '新歌'
  }
*/
export function getRecommends(type) {
  const options = {
    url: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
    param: 'callback',
    params: {
      g_tk: 1928093487,
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      format: 'jsonp',
      loginUin: 0,
      hostUin: 0,
      platform: 'yqq',
      needNewCode: 0,
      data: '{"comm":{"ct":24},"category":{"method":"get_hot_category","param":{"qq":""},"module":"music.web_category_svr"},"recomPlaylist":{"method":"get_hot_recommend","param":{"async":1,"cmd":2},"module":"playlist.HotRecommendServer"},"playlist":{"method":"get_playlist_by_category","param":{"id":8,"curPage":1,"size":40,"order":5,"titleid":8},"module":"playlist.PlayListPlazaServer"},"new_song":{"module":"QQMusic.MusichallServer","method":"GetNewSong","param":{"type":0}},"new_album":{"module":"music.web_album_library","method":"get_album_by_tags","param":{"area":7,"company":-1,"genre":-1,"type":-1,"year":-1,"sort":2,"get_tags":1,"sin":0,"num":40,"click_albumid":0}},"toplist":{"module":"music.web_toplist_svr","method":"get_toplist_index","param":{}},"focus":{"module":"QQMusic.MusichallServer","method":"GetFocus","param":{}}}'
    }
  }
  return new Promise((res, rej) => {
    jsonp(options).then((data) => {
      if(!!type && type !== 'all' ) {
        res(data[type] || ERR_RES)
        return
      }
      res({code: 0, data})
    }).catch((err) => {
      rej(err)
    });
  })
}

// 新歌类别
export function getNewSongList(type) {
  const url = '/api/getNewSongList';
  const data = {
    "comm":{"ct":24},
    "new_song":{
      "module":"QQMusic.MusichallServer",
      "method":"GetNewSong",
      "param":{
        "type": type || 0
      }
    }
  }
  const params = {
    g_tk: 1928093487,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp',
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    platform: 'yqq.json',
    data: JSON.stringify(data)
  }

  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 轮播图
export function getSliders() {
  const options = {
    url: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
    param: 'jsonpCallback',
    params: {
      g_tk: 1928093487,
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      format: 'jsonp',
      platform: 'h5',
      uin: 0,
      needNewCode: 1
    }
  }
  return jsonp(options)
}

//热单推荐
export function getDiscList() {
  const url = '/api/getDiscList'

  const params = {
    g_tk: 1928093487,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp',
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  }

  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

//电台
export function getRadioList() {

  const options = {
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_radiolist.fcg',
    param: 'jsonpCallback',
    params: {
      g_tk: 1928093487,
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      format: 'jsonp',
      channel: 'radio',
      page: 'index',
      tpl: 'wk',
      new: 1,
      loginUin: 0,
      hostUin: 0,
      platform: 'yqq',
      needNewCode: 0,
    }
  }

  return jsonp(options)
}

export function getSongList(disstid) {
  const options = {
    url: 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
    param: 'jsonpCallback',
    params: {
      g_tk: 1928093487,
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      format: 'jsonp',
      disstid,
      type: 1,
      json: 1,
      utf8: 1,
      onlysong: 0,
      platform: 'yqq',
      hostUin: 0,
      needNewCode: 0
    }
  }

  return jsonp(options)
}
