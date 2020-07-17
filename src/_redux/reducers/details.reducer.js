import { combineReducers } from 'redux'
import { appConstants } from '../../_constants';
import { updateObject } from '../../_helpers';

const IsRequestingDetails = (state = false, action) => {
    switch (action.type) {
        case appConstants.REQUEST_DETAILS:
            return true
        case appConstants.DETAILS_SUCCESS:
            return false
        case appConstants.DETAILS_ERROR:
            return false
        default:
            return state;
    }
}

const resultDetails = (state = null, { type, details }) => {
    switch (type) {
        case appConstants.DETAILS_SUCCESS:
            return updateObject(state, details);
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    IsRequestingDetails,
    resultDetails
})

export default rootReducer;