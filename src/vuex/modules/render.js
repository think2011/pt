import {
  ACTIVE_RENDER_ITEM,
  EDIT_RENDER_ITEM,
  ADD_RENDER_ITEM
} from '../mutation-types'
import {modules} from '../../modules'


const state = {
  items  : [
    {"type": "goods-poster", "data": {"time": 1467208634898}}
  ],
  current: {}
}

const mutations = {
  [ADD_RENDER_ITEM](state, type, data) {
    let newItem = _.chain(modules).find({type}).pick(['type', 'data']).cloneDeep().merge({data}).value()

    state.items.push(newItem)
  },
  [EDIT_RENDER_ITEM](state, item) {
    state.current = item
  }
}

export default {
  state,
  mutations
}
