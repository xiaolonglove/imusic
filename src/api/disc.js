import axios from 'axios'
/**
 * 歌单
 * @param {obj} opt {
 *  categoryId: 分类,
 *  sortId: 排序,  2:最新  other:推荐
 *  ein: 长度,
 * }
 * @returns Array
 */
export function getDiscList(opt) {
  const url = '/api/getDiscList'
  const params = {
    picmid: 1,
    rnd: Math.random(),
    g_tk: 853204748,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    categoryId: opt.categoryId || 10000000,
    sortId: opt.sortId || 5,
    sin: 0,
    ein: opt.ein || 29,
  }
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getDiscTag() {
  const url = '/api/getDiscTag'
  const params = {
    g_tk: 853204748,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0
  }
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}