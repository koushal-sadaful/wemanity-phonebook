import homePage from '../reducers/homePageReducer'
import createEdit from '../reducers/createEditEntryReducer'
import thunk from "redux-thunk";
import {applyMiddleware, combineReducers, createStore} from "redux";

export const createTestStore = () => {
    const testReducers = {
        homePage,
        createEdit
    };

    const middleware = [thunk];
    return createStore(combineReducers(testReducers), applyMiddleware(...middleware))
}