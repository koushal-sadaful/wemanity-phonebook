import homePage from '../reducers/homePageReducer'
import thunk from "redux-thunk";
import {applyMiddleware, combineReducers, createStore} from "redux";

export const createTestStore = () => {
    const testReducers = {
        homePage
    };

    const middleware = [thunk];
    return createStore(combineReducers(testReducers), applyMiddleware(...middleware))
}