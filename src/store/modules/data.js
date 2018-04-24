import * as types from '../type'

const state = {
  calculationData: {}
}

const actions = {
  setCalculationData ({commit}, data) {
    commit(types.COM_CALCULATION_DATA, data)
  }
}

const getters = {
  calculationData: state => state.calculationData
}

const mutations = {
  [types.COM_CALCULATION_DATA] (state, data) {
    state.calculationData = data
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
