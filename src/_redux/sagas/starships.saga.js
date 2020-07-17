import { call, put, takeLatest, all } from 'redux-saga/effects';
import { starshipsConstants, appConstants } from '../../_constants';
import { createRequest, checkStatus } from '../../_helpers';

function* getStarships({data}) {  
    yield put({type: starshipsConstants.REQUEST_STARSHIPS}) 
    
    try {               
        let starshipsUri = `${appConstants.BASE_URI}${starshipsConstants.STARSHIPS}`

        if(data.page){
            starshipsUri = `${data.page}`;
        }   

        const curriedReq = yield call(createRequest, starshipsUri, { method: "GET"});           
        const response = yield call(fetch, curriedReq);
        
        yield call(checkStatus,response);

        const jsonResponse = yield call(response.json.bind(response))
        yield put({type:starshipsConstants.REQUEST_STARSHIPS_SUCCESS, starships:jsonResponse}) 
                    
    } catch (error) {
        const errorMessage = yield call(error.response.json.bind(error.response));
        yield put({type:starshipsConstants.REQUEST_STARSHIPS_ERROR, error:errorMessage})
    }
}

function* searchStarship({ data }){
    yield put({type:starshipsConstants.REQUEST_SEARCH_STARSHIP})

    try {  

        let starshipUri = `${appConstants.BASE_URI}${starshipsConstants.STARSHIPS}?search=${data.searchValue}`;

        const starshipReq = yield call(createRequest, starshipUri, { method: "GET" }, '')
        const response = yield call(fetch, starshipReq)

        yield call(checkStatus,response)

            if(response.status === 204) {
                yield put({type:starshipsConstants.SEARCH_STARSHIP_SUCCESS_WITHOUT_DATA})        

                return
            }
            
            const jsonResponse = yield call(response.json.bind(response))
            
            yield put({type:starshipsConstants.SEARCH_STARSHIP_SUCCESS, starship:jsonResponse})      
               
    } catch (error) {
        const errorMessage = yield call(error.response.json.bind(error.response));
        yield put({type:starshipsConstants.SEARCH_STARSHIP_ERROR, error:errorMessage})
    }
}

function* getStarshipsWatcher(){
    yield takeLatest(starshipsConstants.GET_STARSHIPS, getStarships)
}

function* searchStarshipWatcher(){
    yield takeLatest(starshipsConstants.SEARCH_STARSHIP, searchStarship)
}

export default function* rootSaga() {
    yield all([
        getStarshipsWatcher(),
        searchStarshipWatcher(),
    ])
}