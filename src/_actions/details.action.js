import {appConstants} from '../_constants';

const getDetails = (model) => ({    
    type: appConstants.GET_DETAILS,
    data: model,
});

export const detailsActions = {
    getDetails
};