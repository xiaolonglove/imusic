import jsonp from '@/common/js/jsonp'


export function getHotKey() {
  const options ={
    url: 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg',
    param: 'jsonpCallback',
    params: {
      g_tk: 1928093487,
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      format: 'jsonp',
      uin: 0,
      needNewCode: 1,
      platform: 'h5'
    }
  }
  return jsonp(options)
}

export function search(query, page, zhida, perpage) {
  const options ={
    url: 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp',
    param: 'jsonpCallback',
    params: {
      g_tk: 1928093487,
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      format: 'jsonp',
      w: query,
      p: page,
      perpage,
      n: perpage,
      catZhida: zhida ? 1 : 0,
      zhidaqu: 1,
      t: 0,
      flag: 1,
      ie: 'utf-8',
      sem: 1,
      aggr: 0,
      remoteplace: 'txt.mqq.all',
      uin: 0,
      needNewCode: 1,
      platform: 'h5'
    }
  }
  return jsonp(options)
}
