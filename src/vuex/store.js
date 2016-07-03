import Vue from 'vue'
import Vuex from 'vuex'
import render from './modules/render'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    render
  }
})
