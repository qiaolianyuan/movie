
import {
	CHANGE_USERNAME,
	EXIT
} from './const'

export default {
	
	//登陆的方法
	login ( {username, password, success, fail } ) {
		
		let _fail = fail || function () {}
		
		//闭包
		return dispatch => {
			
			setTimeout(() => {
				
				if (username === '123' && password === '456') {
					
					dispatch({
						type: CHANGE_USERNAME,
						userInfo: {
							username: '二狗子',
							signature: '将来的你一定会感谢现在奋斗的你！'
						}
					})
					//成功回调
					success()
					return ;
				}
				_fail()
			},1000)
			
		}
		
	},
	exit () {
		return {
			type: EXIT
		}
	}
	
}
