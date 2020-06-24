import {combineReducers} from 'redux'
import homePage from './homePageReducer'
import {connectRouter} from 'connected-react-router'

export default (history) => combineReducers({
    router: connectRouter(history),
    homePage
})