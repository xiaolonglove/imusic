import axios from 'axios'
import {ERR_OK, commonParams} from './config'

let _uid = '';
export function processSongsUrl(songs) {
  if (!songs.length) {
    return Promise.resolve(songs);
  };
  return getSongsUrl(songs).then((res) => {
    if (res.code === ERR_OK) {
      let midUrlInfo = res.url_mid.data.midurlinfo;
      midUrlInfo.forEach((info, index) => {
        let song = songs[index];
        song.url = `http://dl.stream.qqmusic.qq.com/${info.purl}`;
      });
    };
    return songs;
  });
};

export function getUid() {
  if (_uid) {
    return _uid;
  };
  if (!_uid) {
    const t = (new Date).getUTCMilliseconds();
    _uid = '' + Math.round(2147483647 * Math.random()) * t % 1e10;
  };
  return _uid;
}

export function getLyric(mid) {
  const url = '/api/lyric'
  const params = {
    g_tk: 1928093487,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp',
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  }

  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

function getSongsUrl(songs) {
  const url = '/api/getPurlUrl';

  let mids = [];
  let types = [];

  songs.forEach((song) => {
    mids.push(song.mid);
    types.push(0);
  });

  const urlMid = genUrlMid(mids, types);

  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    format: 'json',
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  });

  return new Promise((resolve, reject) => {
    let tryTime = 3;

    function request() {
      return axios.post(url, {
        comm: data,
        url_mid: urlMid
      }).then((response) => {
        const res = response.data;
        if (res.code === ERR_OK) {
          let urlMid = res.url_mid;
          if (urlMid && urlMid.code === ERR_OK) {
            const info = urlMid.data.midurlinfo[0];
            if (info && info.purl) {
              resolve(res);
            } else {
              retry();
            }
          } else {
            retry();
          }
        } else {
          retry();
        }
      });
    }

    function retry() {
      if (--tryTime >= 0) {
        request();
      } else {
        reject(new Error('Can not get the songs url'));
      }
    }

    request();
  });
}

function genUrlMid(mids, types) {
  const guid = getUid();
  return {
    module: 'vkey.GetVkeyServer',
    method: 'CgiGetVkey',
    param: {
      guid,
      songmid: mids,
      songtype: types,
      uin: '0',
      loginflag: 0,
      platform: '23'
    }
  };
}