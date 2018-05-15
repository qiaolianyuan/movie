
import './index.scss'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actionCreator from '../../../store/allen/actionCreator'


import Banner from './Banner'
import Content from './Content'
class Home extends Component {
	
	render () {
		return (
			<div className = "page-footer home">
				<Banner/>
				<Content/>
			</div>
		)
	}
}
export default connect(state=>state, dispatch=>{
	return bindActionCreators(actionCreator, dispatch)
})(Home)
//
//let high = connect()
//	
//	high(A)


//class A extends Component {
//	render () {
//		return (
//			<div onClick = {this.props.c} >a</div>
//		)
//	}
//}
//class B extends Component {
//	render () {
//		return (
//			<div  onClick = {this.props.c} >b</div>
//		)
//	}
//}
////高阶组件
//const withC = (Template) => {
//	
//	return class extends Component {
//		c () {
//			alert('hello world')
//		}
//		render () {
//			return (
//				<Template c = {this.c} />
//			)
//		}
//	}
//}
//
//const CA = withC(A)
//const CB = withC(B)
//
//class Home extends Component {
//	
//	
//	render () {
//		console.log(this.props)
//		return (
//			<div>
//				Home
//				<CA/>
//				<CB/>
//			</div>
//		)
//	}
//	
//}


