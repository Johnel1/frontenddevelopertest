import {planetConstants} from '../_constants';

const getPlanets = (model) => ({    
    type: planetConstants.GET_PLANETS,
    data: model,
});

const searchPlanet = (model) => ({    
    type: planetConstants.SEARCH_PLANET,
    data: model,
});

export const planetActions = {
    getPlanets,
    searchPlanet
};