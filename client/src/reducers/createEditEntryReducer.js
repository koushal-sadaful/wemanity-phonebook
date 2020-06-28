import {
    CLEAR_CREATE_EDIT_ERROR,
    FETCH_EXISTING_ENTRY, FETCH_EXISTING_ENTRY_ERROR,
    RESET_STATE, UPDATE_WORKING_ENTRY,
} from '../constants/actions'

const initialState = {
    oldRecord: null,
    newRecord: null,
    errorMessage: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_WORKING_ENTRY:
            return {
                ...state,
                newRecord: action.data
            };
        case FETCH_EXISTING_ENTRY_ERROR:
            return {
                ...state,
                errorMessage: action.data
            };
        case CLEAR_CREATE_EDIT_ERROR:
            return {
                ...state,
                errorMessage: null
            };
        case FETCH_EXISTING_ENTRY:
            return {
                ...state,
                oldRecord: action.data
            };
        case RESET_STATE:
            return initialState;
        default:
            return state
    }
}
