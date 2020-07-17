import { call, put, takeLatest, all } from 'redux-saga/effects';
import { peopleConstants, appConstants } from '../../_constants';
import { createRequest, checkStatus } from '../../_helpers';

function* getPeople({data}) {  
    yield put({type: peopleConstants.REQUEST_PEOPLE}) 
    
    try {               
        let peopleUri = `${appConstants.BASE_URI}${peopleConstants.PEOPLE}`

        if(data.page){
            peopleUri = `${data.page}`;
        }   

        const curriedReq = yield call(createRequest, peopleUri, { method: "GET"});     
      
        const response = yield call(fetch, curriedReq);
        yield call(checkStatus,response);

        const jsonResponse = yield call(response.json.bind(response))

        yield put({type:peopleConstants.REQUEST_PEOPLE_SUCCESS, people:jsonResponse}) 
                    
    } catch (error) {
        const errorMessage = yield call(error.response.json.bind(error.response));
        yield put({type:peopleConstants.REQUEST_PEOPLE_ERROR, error:errorMessage})
    }
}

function* searchPerson({ data }){
    yield put({type:peopleConstants.REQUEST_SEARCH_PERSON})

    try {  

        let personUri = `${appConstants.BASE_URI}${peopleConstants.PEOPLE}?search=${data.searchValue}`;

        const personReq = yield call(createRequest, personUri, { method: "GET" }, '')
        const response = yield call(fetch, personReq)

        yield call(checkStatus,response)

            if(response.status === 204) {
                yield put({type:peopleConstants.SEARCH_PERSON_SUCCESS_WITHOUT_DATA})        

                return
            }
            
            const jsonResponse = yield call(response.json.bind(response))
            
            yield put({type:peopleConstants.SEARCH_PERSON_SUCCESS, person:jsonResponse})      
               
    } catch (error) {
        const errorMessage = yield call(error.response.json.bind(error.response));
        yield put({type:peopleConstants.SEARCH_PERSON_ERROR, error:errorMessage})
    }
}

function* getPeopleWatcher(){
    yield takeLatest(peopleConstants.GET_PEOPLE, getPeople)
}

function* searchPersonWatcher(){
    yield takeLatest(peopleConstants.SEARCH_PERSON, searchPerson)
}

export default function* rootSaga() {
    yield all([
        getPeopleWatcher(),
        searchPersonWatcher(),
    ])
}