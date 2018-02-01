import createReducer from './../../tool/createReducer'
import * as types from './types'

export const a = createReducer('123', {
  [types.XU_LIANG_MOST] (state, action) {
    return action.payload
  }
});