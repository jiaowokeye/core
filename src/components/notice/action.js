import * as types from './types'

export function Treevisible (state) {
  return {
    type: types.NOTICE_TREESHOW,
    payload: state
  }
}
export function StartDate(state) {
  return {
    type: types.NOTICE_STATEDATE,
    payload: state
  }
}