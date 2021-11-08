// 主页相关api

import request from '@/http/request'

/**
 * 获取主页数据
 * @param params
 */
export function homeData (params) {
  return request.request({
    url: '/api/resellerOrders/orderFundOverallView',
    method: 'get',
    params
  })
}

/**
 * 获取主页订单面值金额统计
 * @param params
 */
export function getOrderOverallResellerCount (params) {
  return request.request({
    url: '/api/resellerOrders/overallResellerCount',
    method: 'get',
    params
  })
}

/**
 * 获取核销子订单数据
 * @param params
 */
export function getChildOrderData (params) {
  return request.request({
    url: '/api/resellerOrders/orderFundOverallViewByChildReseller',
    method: 'get',
    params
  })
}

/**
 * 小号统计
 */
export function trumpetCount (type) {
  return request.request({
    url: `/api/pretenderAccounts/count/${type}`,
    method: 'get'
  })
}

/**
 * 并发统计
 * @param params
 */
export function superveneCount (params) {
  return request.request({
    url: '/api/resellerOrders/countConcurrency',
    method: 'get',
    params
  })
}
