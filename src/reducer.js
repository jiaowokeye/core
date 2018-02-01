import {combineReducers} from 'redux'
import * as noticepage from './components/notice/reducer'

export default combineReducers(Object.assign(
    noticepage
))