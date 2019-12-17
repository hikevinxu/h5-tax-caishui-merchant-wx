import { fetchPost, fetchGet } from './axios'
import qs from 'qs'

export default {
  /**
   * 获取所有服务
   * @function simpleServiceAll
   * @param  
   */
  simpleServiceAll (params) {
    return fetchGet('/simple/service/all', params)
  },
  /**
   * 获取服务详情接口
   * @function simpleServiceEdit
   * @param  id
   */
  simpleServiceEdit (params) {
    return fetchGet('/simple/service/edit', params)
  },
  /**
   * 服务-下架
   * @function serviceShelfDown
   * @param  id
   */
  serviceShelfDown (params) {
    let paramsString = qs.stringify(params)
    return fetchPost('/service/shelf/down', paramsString)
  },
  /**
   * 服务-上架
   * @function serviceShelfUp
   * @param  id
   */
  serviceShelfUp (params) {
    let paramsString = qs.stringify(params)
    return fetchPost('/service/shelf/up', paramsString)
  },
  /**
   * 服务-更新数据
   * @function simpleServiceUpdate
   */
  simpleServiceUpdate (params) {
    return fetchPost('/simple/service/update', params)
  },
  /**
   * 服务-保存新数据
   * @function simpleServiceAdd
   */
  simpleServiceAdd (params) {
    return fetchPost('/simple/service/add', params)
  }
}
