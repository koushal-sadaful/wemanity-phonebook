import {
    CLEAR_CREATE_EDIT_ERROR,
    CLEAR_HOME_PAGE_ERROR,
    FETCH_ALL_ENTRIES,
    FETCH_ALL_ENTRIES_ERROR, FETCH_EXISTING_ENTRY, FETCH_EXISTING_ENTRY_ERROR, RESET_STATE,
    UPDATE_SEARCH_INPUT, UPDATE_WORKING_ENTRY
} from "../constants/actions";
import {UrlHelper} from "../utils/urlHelper";
import axios from 'axios'
import allEntriesData from '../tests/fakeData/allEntries'


export function getExistingEntry(entryId) {
    return async (dispatch) => {
        try {
            // const response = fakeResponse;
            const response = await axios.get(UrlHelper.getExistingEntryData(entryId));
            dispatch({type: FETCH_EXISTING_ENTRY, data: response.data});
            dispatch({type: CLEAR_CREATE_EDIT_ERROR});
        } catch (e) {
            dispatch({type: FETCH_EXISTING_ENTRY_ERROR, data: e.message});
        }
    }
}

export const updateWorkingRecord = (value) => {
    return (dispatch) => {
        dispatch({type: UPDATE_WORKING_ENTRY, data: value});
    };
};

const fakeResponse = {
    "id": "X1234",
    "firstName": "Jane",
    "lastName": "Doe",
    "phoneNumber": "+852 112 155874"
}