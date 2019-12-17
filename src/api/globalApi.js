import { fetchPost, fetchGet } from './axios'

export default {
  /**
   * 获取所有地址列表（三级联动）
   * @function addressTrees
   * @param  
   */
  addressTrees (params) {
    return fetchGet('/address/trees', params)
  },
  /**
   * 服务项目树结构
   * @function serviceTypeTrees
   * @param  
   */
  serviceTypeTrees (params) {
    return fetchGet('/serviceType/trees', params)
  }
}
