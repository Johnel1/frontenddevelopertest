import { call, put, takeLatest, all } from 'redux-saga/effects';
import { planetConstants, appConstants } from '../../_constants';
import { createRequest, checkStatus } from '../../_helpers';

function* getPlanets({data}) {  
    yield put({type: planetConstants.REQUEST_PLANETS}) 
    
    try {               
        let planetUri = `${appConstants.BASE_URI}${planetConstants.PLANET}`

        if(data.page){
            planetUri = `${data.page}`;
        }  

        const curriedReq = yield call(createRequest, planetUri, { method: "GET"});           
        const response = yield call(fetch, curriedReq);
        
        yield call(checkStatus,response);

        const jsonResponse = yield call(response.json.bind(response))
        yield put({type:planetConstants.REQUEST_PLANETS_SUCCESS, planets:jsonResponse}) 
                    
    } catch (error) {
        const errorMessage = yield call(error.response.json.bind(error.response));
        yield put({type:planetConstants.REQUEST_PLANETS_ERROR, error:errorMessage})
    }
}

function* searchPlanet({ data }){
    yield put({type:planetConstants.REQUEST_SEARCH_PLANET})

    try {  

        let planetUri = `${appConstants.BASE_URI}${planetConstants.PLANET}?filter[name]=${data.searchName}`;

        const planetReq = yield call(createRequest, planetUri, { method: "GET" }, '')
        const response = yield call(fetch, planetReq)

        yield call(checkStatus,response)

            if(response.status === 204) {
                yield put({type:planetConstants.SEARCH_PLANET_SUCCESS_WITHOUT_DATA})        

                return
            }
            
            const jsonResponse = yield call(response.json.bind(response))
            
            yield put({type:planetConstants.SEARCH_PLANET_SUCCESS, planet:jsonResponse})      
               
    } catch (error) {
        const errorMessage = yield call(error.response.json.bind(error.response));
        yield put({type:planetConstants.SEARCH_PLANET_ERROR, error:errorMessage})
    }
}

function* getPlanetsWatcher(){
    yield takeLatest(planetConstants.GET_PLANETS, getPlanets)
}

function* searchPlanetWatcher(){
    yield takeLatest(planetConstants.SEARCH_PLANET, searchPlanet)
}

export default function* rootSaga() {
    yield all([
        getPlanetsWatcher(),
        searchPlanetWatcher(),
    ])
}