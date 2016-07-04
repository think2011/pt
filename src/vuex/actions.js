import {
ADD_RENDER_ITEM,
  ACTIVE_RENDER_ITEM,
  EDIT_RENDER_ITEM
} from './mutation-types'

export const addRenderItem = markAction(ADD_RENDER_ITEM)
export const activeRenderItem = markAction(ACTIVE_RENDER_ITEM)
export const editRenderItem   = markAction(EDIT_RENDER_ITEM)

function markAction(type) {
  return ({dispatch}, ...args) => dispatch(type, ...args)
}
