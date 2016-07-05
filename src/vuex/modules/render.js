import {
  ACTIVE_RENDER_ITEM,
  EDIT_RENDER_ITEM,
  ADD_RENDER_ITEM,
  DROP_RENDER_ITEM
} from '../mutation-types'
import {modules} from '../../modules'


const state = {
  items   : [],
  current : {},
  dragInfo: {}
}

const mutations = {
  [ADD_RENDER_ITEM](state, type, data, index = state.items.length + 1) {
    let newItem = _.chain(modules).find({type}).pick(['type', 'alias', 'data']).cloneDeep().merge({data}).value()

    state.items.splice(index, 0, newItem)
    state.dragInfo = {}
  },

  [EDIT_RENDER_ITEM](state, item) {
    state.current = item
  },

  [ACTIVE_RENDER_ITEM](state, dragInfo) {
    state.dragInfo = dragInfo
  }
}

export default {
  state,
  mutations
}
