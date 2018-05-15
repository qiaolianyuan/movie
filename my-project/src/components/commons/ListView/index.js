

import React, {Component} from 'react'


class ListView extends Component {
	
	constructor (props) {
		super(props)
		
		//当前的屏幕高度
		this.clientHeight = document.documentElement.clientHeight		
		//距离底部的距离
		this.distance = this.props.distance || 30
		//传入的滚动监听
		this.onScroll = this.props.onScroll || function () {}
		//监听滚动条的操作
		this.scrollListener = this.scrollListener.bind(this)
	}
	
	componentWillMount () {
		//如果用户传入的内容不全的话，报错
		let { data, row, loadMore } = this.props
		if( !data || !row || !loadMore) {
			
			console.error('参数不全，请好好传')
		}
	}
	
	renderItems () {
		let { data, row, className } = this.props
		//当没有数据的时候就渲染一个空字符串
		if(data.length<=0) return '';
		//用数据去循环item组件，我们接收的是一个高阶组件，需要执行之后才能得到真正的组件
		return (
			<ul className = {className || "list-group"}>
				{
					data.map(item => {
						return  row(item) 
					})
				}
			</ul>
		)
	}
	
	scrollTo(x = 0,y = 0) {
		
		document.documentElement.scrollTop = y
		document.documentElement.scrollLeft = x
	
	}
	
	render () {
		
		let { data } = this.props
		
		return (
			<div className = "">
				{
					this.renderItems()
				}
			</div>
		)
	}
	
	scrollListener (e) {
		//在这个里面去监听window的scroll事件
		let scrollTop = document.documentElement.scrollTop
		let bodyHeight = document.body.offsetHeight
			
		this.onScroll(e)
		
		if ( bodyHeight - this.clientHeight - this.distance < scrollTop ){
			this.props.loadMore()
		}
	}
	
	componentDidMount () {
		window.addEventListener('scroll',this.scrollListener)
	}
	
	componentWillUnmount () {
		window.removeEventListener('scroll',this.scrollListener)
	}
	
}

export default ListView
