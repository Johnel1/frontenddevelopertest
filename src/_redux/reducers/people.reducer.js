import { combineReducers } from 'redux'
import { peopleConstants } from '../../_constants';
import { updateObject } from '../../_helpers';

const IsRequestingPeople = (state = false, action) => {
    switch (action.type) {
        case peopleConstants.REQUEST_PEOPLE:
            return true
        case peopleConstants.REQUEST_PEOPLE_ERROR:
            return false
        case peopleConstants.REQUEST_PEOPLE_SUCCESS:
            return false
        default:
            return state;
    }
}

const IsSearchingPerson = (state = false, action) => {
    switch (action.type) {
        case peopleConstants.REQUEST_SEARCH_PERSON:
            return true
        case peopleConstants.SEARCH_PERSON_ERROR:
            return false
        case peopleConstants.SEARCH_PERSON_SUCCESS:
            return false
        default:
            return state;
    }
}

const emptyState = {
    name: "",
    birth_year:"",
    eye_color:"",
    gender:""
}

const peopleList =  (state = [], action) => {
    switch (action.type) {          
        case peopleConstants.REQUEST_PEOPLE_SUCCESS: {
            return action.people.results;
        } 
        case peopleConstants.SEARCH_PERSON_SUCCESS: {
            return action.person.results;        
        }
        case peopleConstants.SEARCH_PERSON_SUCCESS_WITHOUT_DATA:  
            return updateObject(state, emptyState);
        default:
            return state;
    }
}

const pagination =  (state = {}, action) => {
    switch (action.type) {          
        case peopleConstants.REQUEST_PEOPLE_SUCCESS: {
            const { count, next, previous} = action.people;
            const result = {count, next, previous};
           
            return updateObject(state, result);
        }  
        case peopleConstants.SEARCH_PERSON_SUCCESS: {
            const { count, next, previous} = action.person;
            const result = {count, next, previous};
           
            return updateObject(state, result);
        }       
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    peopleList,
    IsRequestingPeople,
    IsSearchingPerson,
    pagination
})

export default rootReducer;