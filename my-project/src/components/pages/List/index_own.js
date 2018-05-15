
import './index.scss'
import React, {Component} from 'react'
import axios from 'axios'

//无状态组件  每个商品的item
const GoodsItem = ({info}) => {
	let price = info.skuList[0].price
	return (
		<li className = "goods-item">
			<div className = "img-box img-loading">
				<img width = "100%" src={info.skuList[0].image}/>
			</div>
			<div className = "name">{info.masterName}</div>
			<div className = "content">
				<span className = "price">{ (price/100).toFixed(2) }</span>
				<span className = "inventory">已售{info.displaySalesCount}</span>
			</div>
		</li>
	)
}

class List extends Component {
	
	constructor (props) {
		super(props)
		//能不放入到state里的就别放了
		this.state = {
			goods: []
		}
		this.page = 1;//页数
		this.num = 10;//每页多少
		this.distance = 30;//距离底部多少的时候加载更多
		this.loading = false;//判断是否在加载的开关
		this.scrollListener = this.scrollListener.bind(this)//监听滚动条的函数
	}
	
	getGoods () {//获取更多的数据
		this.isLoading = true
		let { page, num } = this
		axios.get('/aura/api/recommend/home', {
			params: {
				page,num
			}
		}).then(res => {
			console.log(res.data.data.list)
			this.setState({goods: this.state.goods.concat(res.data.data.list)})
			this.isLoading = false
		})
	}
	
	componentWillMount () {
		this.getGoods()//初始化的时候去获取第一波数据
	}
	
	renderItems () {
		//在一开始的每页数据，就不用循环渲染，当有了数据再去循环
		let { goods } = this.state
		if(!goods.length){
			return ''
		}		
		return (
			<ul className = "goods-box">
				{
					goods.map(item => {
						return <GoodsItem key = {item.id} info = {item} />
					})
				}
			</ul>
		)
	}
	
	render () {
		let { goods } = this.state
		return (
			<div className = "page-footer list">
				<div className="title">—&nbsp;好货精选&nbsp;—</div>
				
				{ this.renderItems() }
				
				
				
				
			</div>
		)
	}
	
	loadMore () {//加载更多的方法
		if( this.isLoading ) return false;
		this.page++
		this.getGoods()
	}
	
	scrollListener (e) {//监听函数

		let scrollTop = document.documentElement.scrollTop
		let clientHeight = document.documentElement.clientHeight
		let bodyHeight = document.body.offsetHeight
		//如果需要加载更多的时候加载更多
		if ( bodyHeight - clientHeight - 50 < scrollTop ){
			this.loadMore()
		}
	}
	
	componentDidMount () {
		//在这个钩子里去给window绑定scroll监听
		window.addEventListener('scroll',this.scrollListener)
	}
	
	componentWillUnmount () {
		//当切换出去的时候,相当于List被销毁,在这里取消window的监听
		window.removeEventListener('scroll',this.scrollListener)
	}
	
}

export default List



//<ListView
//	data = {data}
//	row = {GoodsItem}
//	distance = {500}
//	onScroll = {(e)=>{
//		
//	}}
///>