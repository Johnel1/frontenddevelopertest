import { all } from 'redux-saga/effects'
import peopleRootSaga from './people.saga'
import planetRootSaga from './planet.saga'
import starshipsRootSaga from './starships.saga'
import detailsRootSaga from './details.saga'

export default function* rootSaga() {
    yield all([
        peopleRootSaga(),
        planetRootSaga(),
        starshipsRootSaga(),
        detailsRootSaga()
    ])
}