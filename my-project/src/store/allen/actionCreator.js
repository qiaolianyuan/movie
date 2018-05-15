
import {
	CHANGE_BOARDLIST,
	CHANGE_HOMELIST
} from './const'

import axios from 'axios'
export default {
	
	getBoardList () {
		return dispatch => {
			axios.get('/mz/v4/api/billboard/home',{
				params: {__t: Date.now()}
			}).then (res => {
				console.log(res.data.data.billboards)
				dispatch({
					type: CHANGE_BOARDLIST,
					boardlist: res.data.data.billboards
				})
			})	
		}
	},
	changeNum () {
		return {
			type: 'CHANGE_NUM'
		}
	},
	getHomeList () {
		return dispatch => {
			axios.get('/aura/api/recommend/home?page=1&num=8').then (res => {
				dispatch({
					type: CHANGE_HOMELIST,
					homelist: res.data.data.list
				})
			})	
		} 
	}
	
}
