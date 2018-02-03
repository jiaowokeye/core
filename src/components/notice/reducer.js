import createReducer from './../../tool/createReducer'
import * as types from './types'

export const noticeTreeVisible = createReducer(false, {
  [types.NOTICE_TREESHOW] (state, action) {
    return action.payload
  }
  
});
export const noticeStartDate = createReducer("2018-01", {
  [types.NOTICE_STATEDATE](state, action) {
    return action.payload
  }
});

