
import _state from './state'
import {
	CHANGE_BOARDLIST,
	CHANGE_HOMELIST
} from './const'
const reducer = ( state = _state, action ) => {
	let new_state = Object.assign({}, state)
	
	switch ( action.type ) {
		case CHANGE_BOARDLIST:
			new_state.boardlist = action.boardlist;break;
		case 'CHANGE_NUM':
			new_state.num ++;break;
		case CHANGE_HOMELIST:
		
			new_state.homelist = action.homelist;break;
		default:break;
	}
	
	
	
	
	return new_state
}

export default reducer