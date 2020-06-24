import {
    CLEAR_ERROR,
    FETCH_ALL_ENTRIES,
    FETCH_ALL_ENTRIES_ERROR,
    RESET_STATE, UPDATE_SEARCH_INPUT,
} from '../constants/actions'

const initialState = {
    allEntries: [],
    searchValue: null,
    errorMessage: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_ENTRIES:
            return {
                ...state,
                allEntries: action.data
            };
        case FETCH_ALL_ENTRIES_ERROR:
            return {
                ...state,
                errorMessage: action.data
            };
        case UPDATE_SEARCH_INPUT:
            return {
                ...state,
                searchValue: action.data
            };

        case CLEAR_ERROR:
            return {
                ...state,
                errorMessage: null
            };
        case RESET_STATE:
            return initialState;
        default:
            return state
    }
}
