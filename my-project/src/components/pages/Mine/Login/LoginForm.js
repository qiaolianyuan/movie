
import './index.scss'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actionCreator from '../../../../store/user/actionCreator'

class LoginForm extends Component {
	
	constructor (props) {
		super(props)
		
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	
	handleSubmit (e) {//登陆函数
		e.preventDefault()
		let { history, login } = this.props
		login({
			username:this.username.value,
			password:this.password.value,
			success () {
			
			},
			fail () {
				alert('登陆失败')
			}
		})
		
	}
	
	render () {
		return (
			<form onSubmit = { this.handleSubmit } className = "login-form">
				
				<div className="form-group" >
					<input  ref = {el => this.username = el} type="text" className="form-control" placeholder="输入手机号" />
					<div className="input-bg" ></div>
				</div>
				
				<div className="form-group" >
					<input  ref = {el => this.password = el} type="password" className="form-control" placeholder="输入密码" />
					<div className="input-bg" ></div>
				</div>
			
				<button type = "submit" className = "button">登陆</button>
			
			</form>
		)
	}
	
}

export default connect(state => state, dispatch => {
	return bindActionCreators(actionCreator, dispatch)
})(LoginForm)
