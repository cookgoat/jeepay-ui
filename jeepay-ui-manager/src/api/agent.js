// 代理商相关api

import request from '../http/request'

/**
 * 查询代理商列表
 * @param params
 */
export function getAgentList (params) {
  return request.request({
    url: '/api/resellersAgents',
    method: 'get',
    params
  })
}

/**
 * 添加代理商
 * @param params
 */
export function addAgent (params) {
  return request.request({
    url: '/api/resellersAgents',
    method: 'post',
    data: params
  })
}

/**
 * 更新代理
 * @param id
 * @param params
 */
export function updateAgent (id, params) {
  return request.request({
    url: `/api/resellersAgents/${id}`,
    method: 'put',
    data: params
  })
}

/**
 * 获取某个代理商的详情
 * @param id
 */
export function getAgentDetail (id) {
  return request.request({
    url: `/api/resellersAgents/${id}`,
    method: 'get'
  })
}
