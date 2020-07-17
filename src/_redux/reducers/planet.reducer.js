import { combineReducers } from 'redux'
import { planetConstants } from '../../_constants';
import { updateObject } from '../../_helpers';

const IsRequestingPlanets = (state = false, action) => {
    switch (action.type) {
        case planetConstants.REQUEST_PLANETS:
            return true
        case planetConstants.REQUEST_PLANETS_ERROR:
            return false
        case planetConstants.REQUEST_PLANETS_SUCCESS:
            return false
        default:
            return state;
    }
}

const IsSearchingPlanet = (state = false, action) => {
    switch (action.type) {
        case planetConstants.REQUEST_SEARCH_PLANET:
            return true
        case planetConstants.SEARCH_PLANET_ERROR:
            return false
        case planetConstants.SEARCH_PLANET_SUCCESS:
            return false
        default:
            return state;
    }
}

const planetsList =  (state = [], action) => {
    switch (action.type) {          
        case planetConstants.REQUEST_PLANETS_SUCCESS: {
            return action.planets.results;
        } 
        default:
            return state;
    }
}

const pagination =  (state = {}, action) => {
    switch (action.type) {          
        // case planetConstants.REQUEST_PLANETS_SUCCESS: {
        //     const { hasNextPage, nextPage, totalDocs, limit, page} = action.PLANETS.data;
        //     const result = {hasNextPage, nextPage, totalDocs, limit, page};
           
        //     return updateObject(state, result);
        // }  
        case planetConstants.SEARCH_PLANET_SUCCESS: {
            const { hasNextPage, nextPage, totalDocs, limit, page} = action.PLANET.data;
            const result = {hasNextPage, nextPage, totalDocs, limit, page};
           
            return updateObject(state, result);
        }       
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    planetsList,
    IsRequestingPlanets,
    IsSearchingPlanet,
    pagination
})

export default rootReducer;