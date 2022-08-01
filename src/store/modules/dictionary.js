/*
 * @Author: Hongzf
 * @Date: 2022-08-01 17:35:57
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-01 17:42:07
 * @Description:
 */
// import { setToken, removeToken } from '@/utils/auth'
// import router, { resetRouter } from '@/router'

const state = {
  name: ''
}

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
