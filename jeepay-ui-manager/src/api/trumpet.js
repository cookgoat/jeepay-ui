// 小号管理相关api

import request from '@/http/request'

/**
 * @param params
 * @return Promise
 */

export function getTrumpetList (params) {
  return request.request({
    url: '/api/pretenderAccounts',
    method: 'get',
    params
  })
}

/**
 * 导出列表
 * @param params
 */
export function exportData (params) {
  return request.request({
    url: '/api/pretenderAccounts/export',
    method: 'get',
    responseType: 'blob',
    params
  })
}

/**
 * 批量开启关闭小号
 * @param params
 */
export function batchOperation (params) {
  return request.request({
    url: '/api/pretenderAccounts/switch',
    method: 'post',
    data: params
  })
}

/**
 * @param params
 * @return Pormise
 */
export function addTrumpet (params) {
  return request.request({
    url: '/api/pretenderAccounts',
    method: 'post',
    data: params
  })
}
