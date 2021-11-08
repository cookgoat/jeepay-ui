// 核销商相关api
import request from '@/http/request'

/**
 * @param params
 * @return Promise
 */
export function accountList (params) {
  return request.request({
    url: '/api/resellers',
    method: 'get',
    params
  })
}

/**
 * @param resellerId
 * @param params
 * @return Promise
 */
export function updateAccount (resellerId, params) {
  return request.request({
    url: `/api/resellers/${resellerId}`,
    method: 'put',
    data: params
  })
}

/**
 * 查询核销商代理列表
 */
export function writeOffAgentList () {
  return request.request({
    url: '/api/resellersAgents',
    method: 'get',
  })
}

/**
 * 新增核销商
 * @param params
 */
export function addAccount (params) {
  return request.request({
    url: '/api/resellers',
    method: 'post',
    data: params
  })
}

/**
 * 手动添加核销订单
 */
export function addWriteOffOrder (params) {
  return request.request({
    url: '/api/resellerOrders',
    method: 'post',
    data: params
  })
}
