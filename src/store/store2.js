import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
	count:0
}
const mutations = {
    increment:state =>{
        state.count = state.count + 1
    },
    decrement:state =>{
        state.count = state.count - 1
    }
}
const actions = {
  incrementAction:({commit})=>commit('increment'),
  decrementAction:({commit})=>commit('decrement')
}
const getters = {
  evenOrOdd:state => state.count % 2 === 0?'even':'odd'
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
