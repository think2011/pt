import {
  ACTIVE_RENDER_ITEM,
  EDIT_RENDER_ITEM,
  ADD_RENDER_ITEM
} from '../mutation-types'
import {modules} from '../../modules'


const state = {
  items   : [{
    "type" : "goods-hot-sale",
    "alias": "热卖单品模块",
    "data" : {
      "color"    : {
        "type"   : "color",
        "title"  : "颜色",
        "value"  : "#FF5A50",
        "options": ["#FF5A50", "#44B791", "#F39F23"]
      },
      "goods"    : {"type": "selectGoods", "title": "选择宝贝", "value": null},
      "countdown": {
        "type" : "countdown",
        "title": "活动时间",
        "value": {"start": "2016-07-04 15:47:45", "end": "2016-07-05 15:47:45"}
      }
    }
  }],
  current : {},
  dragInfo: {}
}

const mutations = {
  [ADD_RENDER_ITEM](state, type, data, index = state.items.length + 1) {
    let newItem = _.chain(modules).find({type}).pick(['type', 'alias', 'data']).cloneDeep().merge({data}).value()

    state.items.splice(index, 0, newItem)
    state.current  = newItem
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
