import {
  ACTIVE_RENDER_ITEM
} from './mutation-types'

export const activeDropItem = markAction(ACTIVE_RENDER_ITEM)

function markAction(type) {
  return ({dispatch}, ...args) => dispatch(type, args)
}
