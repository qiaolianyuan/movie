
import './index.scss'
import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import LoginForm from './LoginForm'

let Header = props => {
	return (
		<header >
			<div className = "back">
				<Link to="/"> <i className = "fa fa-angle-left"></i> </Link>
			</div>
		</header>
	)
}

class Login extends Component {
	
	
	render () {
		return (
			<div className = "login page-header">
				<Header/>
				
				<LoginForm history = {this.props.history} />
			</div>
		)
	}
	
}

export default Login
