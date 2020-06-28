import {
    CLEAR_HOME_PAGE_ERROR,
    FETCH_ALL_ENTRIES,
    FETCH_ALL_ENTRIES_ERROR, RESET_STATE,
    UPDATE_SEARCH_INPUT
} from "../constants/actions";
import {UrlHelper} from "../utils/urlHelper";
import axios from 'axios'
import allEntriesData from '../tests/fakeData/allEntries'


export function fetchAllEntries() {
    return async (dispatch) => {
        try {
            // const response = allEntriesData;
            const response = await axios.get(UrlHelper.getAllEntriesUrl())
            dispatch({type: FETCH_ALL_ENTRIES, data: response.data});
            dispatch({type: CLEAR_HOME_PAGE_ERROR});
        } catch (e) {
            dispatch({type: FETCH_ALL_ENTRIES_ERROR, data: e.message});
        }
    }
}

export const updateSearchInputValue = (value) => {
    return (dispatch) => {
        dispatch({type: UPDATE_SEARCH_INPUT, data: value});
    };
};
export const resetState = () => {
    return (dispatch) => {
        dispatch({type: RESET_STATE});
    };
};