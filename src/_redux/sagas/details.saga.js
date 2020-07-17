import { call, put, takeLatest, all } from 'redux-saga/effects';
import { appConstants } from '../../_constants';
import { createRequest, checkStatus } from '../../_helpers';

function* getDetails({data}){
    yield put({type: appConstants.REQUEST_DETAILS})
    try {
        const detailsUri = `${data}`;
        const req = yield call(createRequest, detailsUri, { method: "GET"})
        const response = yield call(fetch, req)

        yield call(checkStatus,response)
        const jsonResponse = yield call(response.json.bind(response))

        yield put({type:appConstants.DETAILS_SUCCESS, details:jsonResponse})
    } catch (error) {
        yield put({type:appConstants.DETAILS_ERROR})
    }
}

function* getDetailsWatcher(){
    yield takeLatest(appConstants.GET_DETAILS, getDetails)
}

export default function* rootSaga() {
    yield all([
        getDetailsWatcher(),
    ])
}