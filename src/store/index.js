import Vue from 'vue'
import Vuex from 'vuex'
import types from './types.js'

// 把vuex数据缓存到sessionStorage
import plugins from './sessionPlugin'

// 恢复Vuex 相应模块里面的数据 fix: 刷新页面，vuex数据会丢失
const data = JSON.parse(sessionStorage.getItem('state'))

const state = {
  token: data && data.token || '',
  //登陆后存用户信息
  userInfo: data && data.userInfo || {},
  messageEditor: data && data.messageEditor || false,
  ringTabValue: data && data.ringTabValue || 1,
  deviceTabValue: data && data.deviceTabValue || 1,
  qualityTabValue: data && data.qualityTabValue || 1,
  capacityTabValue: data && data.capacityTabValue || 1,
  //选中的设备信息
  deviceInfo: data && data.deviceInfo || {},
  messageTabValue: data && data.messageTabValue || 1,
  allDevice: data && data.allDevice || '', // 所有设备信息
}

const getters = {}

const actions = {
  allDevice({ commit }, allDevice) {
    commit(types.ALL_DEVICE, allDevice);
  },
  clear({ commit }) {
    commit(types.CLEAR);
  },
}

const mutations = {
  //存token
  setToken(state, value) {
    state.token = value
  },
  //存用户登陆信息
  setUserInfo(state, value) {
    state.userInfo = value
  },
  editor(state) {
    state.messageEditor = !state.messageEditor
  },
  ringTabChange(state, value) {
    state.ringTabValue = value
  },
  deviceTabChange(state, value) {
    state.deviceTabValue = value
  },
  qualityTabChange(state, value) {
    state.qualityTabValue = value
  },
  capacityTabChange(state, value) {
    state.capacityTabValue = value
  },
  //选中的设备信息
  saveDeviceInfo(state, value) {
    var { furnaceNo, sourceId, deviceName, deviceId, orgId, orgName, isCheck } = value
    state.deviceInfo = { furnaceNo, sourceId, deviceName, deviceId, orgId, orgName, isCheck }
  },
  messageTabChange(state, value) {
    state.messageTabValue = value
  },
  [types.ALL_DEVICE](state, value) {
    state.allDevice = value;
  },
  [types.CLEAR](state) {
    Object.keys(state).forEach(item => {
      state[item] = null;
    });
  },
}

Vue.use(Vuex)

export default new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  plugins,
  state,
  getters,
  actions,
  mutations,
})