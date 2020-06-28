import {combineReducers} from 'redux'
import homePage from './homePageReducer'
import createEdit from './createEditEntryReducer'
import {connectRouter} from 'connected-react-router'

export default (history) => combineReducers({
    router: connectRouter(history),
    homePage,
    createEdit
})