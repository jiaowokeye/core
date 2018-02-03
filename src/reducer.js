import {combineReducers} from 'redux'
import * as noticeReduce from './components/notice/reducer'

export default combineReducers(Object.assign(
    noticeReduce
))