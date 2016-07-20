import {
    ACTIVE_RENDER_ITEM,
    EDIT_RENDER_ITEM,
    ADD_RENDER_ITEM,
    BLUR_RENDER_ITEM
} from '../mutation-types'
import {modules} from '../../modules'


const state = {
    items   : [],
    title   : '网页标题',
    current : {},
    dragInfo: {}
}

const mutations = {
    [ADD_RENDER_ITEM](state, type, data, index = state.items.length + 1) {
        let module = {}

        _.each(modules, (moduleItem) => {
            module = _.find(moduleItem.items, {type})
        })

        let newItem = _.chain(module).pick(['type', 'alias', 'data']).cloneDeep().merge({data}).value()

        state.items.splice(index, 0, newItem)
        state.current  = newItem
        state.dragInfo = {}
    },

    [EDIT_RENDER_ITEM](state, item) {
        state.current = item
    },

    [ACTIVE_RENDER_ITEM](state, dragInfo) {
        state.dragInfo = dragInfo
    },

    [BLUR_RENDER_ITEM](state) {
        state.current = {}
    }
}

export default {
    state,
    mutations
}
