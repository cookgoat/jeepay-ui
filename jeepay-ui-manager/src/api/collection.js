// 回款管理相关api

import request from '@/http/request'

/**
 * 获取回款列表
 * @param params
 * @return Promise
 */
export function getCollectionList (params) {
  return request.request({
    url: '/api/resellerOrders/queryResellerReturnCount',
    method: 'get',
    params
  })
}
