import { fetchPost, fetchGet } from './axios'

export default {
  // 获取所有咨询栏列表
  addressTrees (params) {
    return fetchGet('/address/trees', params)
  }
}
