import {peopleConstants} from '../_constants';

const getPeople = (model) => ({    
    type: peopleConstants.GET_PEOPLE,
    data: model,
});

const searchPerson = (model) => ({    
    type: peopleConstants.SEARCH_PERSON,
    data: model,
});

export const peopleActions = {
    getPeople,
    searchPerson
};