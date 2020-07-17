import { combineReducers } from 'redux'
import { starshipsConstants } from '../../_constants';
import { updateObject } from '../../_helpers';

const IsRequestingStarships = (state = false, action) => {
    switch (action.type) {
        case starshipsConstants.REQUEST_STARSHIPS:
            return true
        case starshipsConstants.REQUEST_STARSHIPS_ERROR:
            return false
        case starshipsConstants.REQUEST_STARSHIPS_SUCCESS:
            return false
        default:
            return state;
    }
}

const IsSearchingStarship = (state = false, action) => {
    switch (action.type) {
        case starshipsConstants.REQUEST_SEARCH_STARSHIP:
            return true
        case starshipsConstants.SEARCH_STARSHIP_ERROR:
            return false
        case starshipsConstants.SEARCH_STARSHIP_SUCCESS:
            return false
        default:
            return state;
    }
}

const emptyState = {
    MGLT: "",
    cargo_capacity:"",
    consumables:"",
    cost_in_credits:"",
    crew:""
}

const starshipsList =  (state = [], action) => {
    switch (action.type) {          
        case starshipsConstants.REQUEST_STARSHIPS_SUCCESS: {
            return action.starships.results;
        } 
        case starshipsConstants.SEARCH_STARSHIP_SUCCESS: {
            return action.starship.results;        
        }
        case starshipsConstants.SEARCH_STARSHIP_SUCCESS_WITHOUT_DATA:  
            return updateObject(state, emptyState);
        default:
            return state;
    }
}

const pagination =  (state = {}, action) => {
    switch (action.type) {          
        case starshipsConstants.REQUEST_STARSHIPS_SUCCESS: {
            const { count, next, previous} = action.starships;
            const result = {count, next, previous};
           
            return updateObject(state, result);
        }  
        case starshipsConstants.SEARCH_STARSHIP_SUCCESS: {
            const { count, next, previous} = action.starship;
            const result = {count, next, previous};
           
            return updateObject(state, result);
        }       
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    starshipsList,
    IsRequestingStarships,
    IsSearchingStarship,
    pagination
})

export default rootReducer;