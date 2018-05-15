
import './index.scss'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import actionCreator from '../../../store/cars/actionCreator'
import {
	Route
} from 'react-router-dom'

import Login from './Login'
import User from './User'

class Mine extends Component {
	
	checkLogin (props) {
		
		let _props = props || this.props
		
		let { path } = _props.match
		//如果没有登陆的话，跳转登陆子路由，否则跳转user子路由
		if (!_props.user.userInfo) {
			console.log('没登陆')
			_props.history.replace(`${path}/login`)

			if(!this.props.user.userInfo){
				this.props.allInfo.num = 0
				this.props.allInfo.price = 0
			}
	
		}else{
			console.log('登陆了')
			
			//获取用户的购物车信息
			
			this.props.getInitCars()
			
			_props.history.replace(`${path}/user`)
		}
	}
	
	componentWillMount () {
		this.checkLogin()
	}
//	
	componentWillReceiveProps (props) {
		//当store里的数据更改的时候，容器组件会给UI组件传入新的属性，这个生命周期钩子函数会执行
		//当用户信息更改的时候，这个函数会执行，
		//当路由信息改变的时候，因为Mine是路由组件，所以它属性上的location..都会改变，也相当于属性改变，这个函数也会执行
		//我们想要做的是当用户信息改变的时候，在这个函数里判断是否跳转到user，所以得专门的去判断当用户恓改变的情况下再去做处理
		if( props.user.userInfo !== this.props.user.userInfo ) {
			this.checkLogin(props)
		}
	}
	render () {
		let { path } = this.props.match
		return (
			<div>
				
				<Route path = {`${path}/login`} component = { Login }/>
				<Route path = {`${path}/user`} component = { User }/>
			</div>
		)
	}
	
}

export default connect(state => {
	//做了类型getters的作用，获取到总数量和总价钱
	let allInfo = {
		num: 0, price: 0
	}
	
	state.cars.cars.forEach(item => {
		allInfo.num += item.num
		allInfo.price += item.num*item.price
	})
	
	return {
		...state,
		allInfo
	}
}, dispatch => {
	return bindActionCreators(actionCreator, dispatch)
})(Mine)
