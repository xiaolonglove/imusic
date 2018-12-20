import jsonp from '@/common/js/jsonp'

export function getSingerList() {
  const options = {
    url: 'https://c.y.qq.com/v8/fcg-bin/v8.fcg',
    param: 'jsonpCallback',
    params: {
      g_tk: 1928093487,
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      format: 'jsonp',
      channel: 'singer',
      page: 'list',
      key: 'all_all_all',
      pagesize: 100,
      pagenum: 1,
      hostUin: 0,
      needNewCode: 0,
      platform: 'yqq'
    }
  }

  return jsonp(options)
}

export function getSingerDetail(singerId) {
  const options ={
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg',
    param: 'jsonpCallback',
    params: {
      g_tk: 1928093487,
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      format: 'jsonp',
      hostUin: 0,
      needNewCode: 0,
      platform: 'yqq',
      order: 'listen',
      begin: 0,
      num: 80,
      songstatus: 1,
      singermid: singerId
    }
  }
  return jsonp(options)
}

