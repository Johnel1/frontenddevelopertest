import {starshipsConstants} from '../_constants';

const getStarships = (model) => ({    
    type: starshipsConstants.GET_STARSHIPS,
    data: model,
});

const searchStarship = (model) => ({    
    type: starshipsConstants.SEARCH_STARSHIP,
    data: model,
});

export const starshipsActions = {
    getStarships,
    searchStarship
};