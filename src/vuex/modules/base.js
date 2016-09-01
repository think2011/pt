import {
    FOCUS_DOCUMENT_TITLE
} from '../mutation-types'

const state = {
    activeDocumentTitle: false
}

const mutations = {
    [FOCUS_DOCUMENT_TITLE](state, active = true) {
        state.activeDocumentTitle = active
    }
}

export default {
    state,
    mutations
}