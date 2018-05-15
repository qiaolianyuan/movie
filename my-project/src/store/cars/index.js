
import _state from './state'
import {
	CHANGE_CARS
} from './const'
const reducer = ( state = _state, action ) => {
	let new_state = Object.assign({}, state)
	
	switch ( action.type ) {
		case CHANGE_CARS:
			new_state.cars = action.cars;break;
		default:break;
	}
	
	
	
	
	return new_state
}

export default reducer