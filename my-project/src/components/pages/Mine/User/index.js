
import './index.scss'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actionCreator from '../../../../store/user/actionCreator'

class User extends Component {
	
	
	render () {
		let { userInfo } = this.props.user
		return (
			<div className = "mine-user page-footer">
				<div className = "bg-box">
				
				</div>
				<div className = "info-box">
					
					
					
					<button onClick = { this.props.exit }>注销</button>
				
				</div>
				
				
				
			</div>
		)
	}
	
}

export default connect(state => state, dispatch => {
	return bindActionCreators(actionCreator, dispatch)
})(User)
