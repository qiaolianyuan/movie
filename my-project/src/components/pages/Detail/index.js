
import './index.scss'
import React, {Component} from 'react'
import { NavBar, Icon } from 'antd-mobile';
import Banner from './Banner'
import Control from '../../commons/Control'
import axios from 'axios'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actionCreator from '../../../store/cars/actionCreator'

class Detail extends Component {
	
	constructor (props) {
		super(props)
		
		this.state = {
			data:{},
			desc: '',
			num: 1
		}
		
		this.controlNum = this.controlNum.bind(this)
		this.addGoodInCar = this.addGoodInCar.bind(this)
	}
	
	componentWillMount () {
		//获取初始数据
		axios.get('/aura/api/item',{
			params: {id: this.props.match.params.id}
		}).then(res => {
			this.setState({data: res.data.data})
		})
		//描述
		axios.get('/aura/api/item/desc',{
			params: {id: this.props.match.params.id}
		}).then(res => {
			this.setState({desc: '<p>哈哈哈</p>'})
		})
	}
	
	controlNum (action) {//更改数量的方法
		this.setState(prevState => {
			let num = action ? prevState.num + 1 : prevState.num-1
			if (num <=0 ){
				num = 1
			}
			return  {num} 		
		})
	}
	addGoodInCar () {
		//做了登陆验证，如果没有登陆的话跳转到登陆页
		if ( this.props.user.userInfo ) {
			let { addGoodInCar } = this.props
			let { data,num } = this.state
			let { id, masterName, skuList} = data
			let price = skuList[0].price
		
			addGoodInCar({id, masterName, price, num})
		}else {
			this.props.history.push('/mine/login')
		}
		
		
	}
	
	renderContent () {
		let { data, desc, num } = this.state
		
		
		if ( !data.id ) return '';
		
		
		return (
			<div>
				<Banner banners = {data.skuList[0].images}/>				
				
				<div className = "control">
					<div className = "title">选择数量</div>
					<Control  num = { num } controlNum = {this.controlNum} />
				</div>
				
				
				
				<div dangerouslySetInnerHTML={{ __html: desc }}></div>
				
				<div className="item-bottom">
					<div 
					onClick = {
						this.addGoodInCar
					}
					className="item-footer-right item-footer-act">加入购物车</div>
				</div>
			</div>
		)
		
	}
	
	render () {
		let { cars } = this.props.cars
		return (
			<div className = "page-header detail">
				 <NavBar
			      mode="dark"
			      icon={<Icon type="left" />}
			      onLeftClick={() => this.props.history.go(-1)}
			  
			    >详情</NavBar>
			    
			    {this.renderContent()}
			    
			    
			</div>
		)
	}
	
}

export default connect(state => state, dispatch => {
	return bindActionCreators(actionCreator, dispatch)
})(Detail)
