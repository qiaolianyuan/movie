

import { combineReducers } from 'redux'

import user from './user'
import allen from './allen'
import cars from './cars'

const reducer = combineReducers({
	user,allen,cars
})

export default reducer
