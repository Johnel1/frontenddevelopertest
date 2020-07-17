import { combineReducers } from 'redux';
import peopleRootReducer from './people.reducer';
import planetRootReducer from './planet.reducer';
import starshipsRootReducer from './starships.reducer';
import detailsRootReducer from './details.reducer';

const rootReducer = combineReducers({
    people:peopleRootReducer,
    planet:planetRootReducer,
    starships:starshipsRootReducer,
    details:detailsRootReducer
})

export default rootReducer;