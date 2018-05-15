
import './index.scss'
import React, {Component} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actionCreator from '../../../store/cars/actionCreator'
import Control from '../../commons/Control'

const CarsItem = ({info, addGoodInCar, reduceGoodInCar, userInfo, history}) => {
	
	let { id, masterName, price, num } = info
	
	function controlNum (action) {
		console.log(action)
		if(userInfo){
			if (action) {
				addGoodInCar({id,masterName,price, num: 1})
			}else {
				reduceGoodInCar({id,num:1})
			}
		}else{
			history.push('/mine/login')
		}
		
	}
	
	return (
		<div className = "item">
			<h3 className = "title"> {masterName}  <span className = "price">${(price/100).toFixed(2)}</span> </h3>
			
			<Control 
				controlNum = {controlNum}
				num = {num}
			/>
		
		</div>
	)
}

class Cars extends Component {
	
	
	render () {
		console.log(this.props)
		let { cars } = this.props.cars
		let { addGoodInCar, reduceGoodInCar, allInfo } = this.props
		return (
			<div className = "cars">
				
				{
					cars.map(item => {
						return <CarsItem 
							key = {item.id}
							info = {item}
							addGoodInCar = {addGoodInCar}
							reduceGoodInCar = {reduceGoodInCar}
							userInfo = {this.props.user.userInfo}
							history = { this.props.history}
						/>
					})
				}
				
				
				<div> 
					总价钱: { (allInfo.price/100).toFixed(2) }
					总数量: { allInfo.num }
				</div>
				
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
})( Cars )
