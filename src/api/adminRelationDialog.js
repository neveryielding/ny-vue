import request from '@/utils/request'

/**
 * 查询未关联数据
 * @param {*} url 链接
 * @param {*} query  查询参数
 */
export function noRelation(url, query) {
  return request({
    url: url,
    method: 'get',
    params: query
  })
}

/**
 * 查询已关联数据
 * @param {*} url 链接
 * @param {*} query  查询参数
 */
export function relation(url, query) {
  return request({
    url: url,
    method: 'get',
    params: query
  })
}

/**
 *批量保存关联关系
 * @param {*} url 链接
 * @param {*} query  保存关联参数
 */
export function batchSave(url, params) {
  return request({
    url: url,
    method: 'post',
    data: params
  })
}

/**
 *批量删除关联关系
 * @param {*} url 链接
 * @param {*} query  删除关联参数
 */
export function batchDelete(url, params) {
  return request({
    url: url,
    method: 'post',
    data: params
  })
}
