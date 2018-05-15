
import './index.scss'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actionCreator from '../../../store/allen/actionCreator'

import Swiper from 'swiper'

const BoardItem = ({info}) => {
	return (
		<div className = "swiper-slide">
			<div className = "img-box img-loading">
				<img width = "100%" src = {info.imageUrl}/>
			</div>
		</div>
	)
}

class Banner extends Component {
	
	componentWillMount () {
		//切换进home的时候，如果是第一次进行，没有数据，去获取，第二次就不需要获取了
		if ( this.props.boardlist.length<=0 ) {
			
			this.props.getBoardList()
		}		
	}
	
	
	render () {
		let { boardlist } = this.props
		return (
			<div ref = {el => this.el = el} className = "swiper-container banner">
				<div className = "swiper-wrapper">
					{
						boardlist.map(item => {
							return <BoardItem info = {item}  key = {item.id}/>
						})
					}
				</div>
				<div className = "swiper-pagination"></div>
			</div>
		)
	}
	componentDidMount () {
		//进入到home的时候，如果有数据，说明是第二次进入了，这个时候直接在这里实例化
		if ( this.props.boardlist.length>0 ) {
			new Swiper(this.el, {
				pagination:{ el: '.swiper-pagination'}
			})
		}
	}
	componentWillReceiveProps () {
		console.log('componentWillReceiveProps')
	}
	componentDidUpdate () {
		//因为组件使用的是全局的state，当state只要改变，不管的哪里的state，只要是store里的state改变，容器组件就能得知，就会将数据重新传递给UI组件，这个函数就会执行，也就是说会造成无关状态的更改，导致多次实例化swiper
		
		//在这里，我们采用的处理方式是，让容器组件只去接收轮播图数据，这样的话，当其他的状态更新的时候，容器组件不予理睬，就不会给UI组件传入新的属性，这里的问题也不存在了
		new Swiper(this.el, {
			pagination:{ el: '.swiper-pagination'}
		})
	}

}

//export default connect(state => state, dispatch => {
//	return bindActionCreators(actionCreator, dispatch)
//})(Banner)
//让容器组件只去监控轮播数据
export default connect(state => {
	return {
		boardlist: state.allen.boardlist
	}
}, dispatch => {
	return bindActionCreators(actionCreator, dispatch)
})(Banner)
