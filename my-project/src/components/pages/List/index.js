
import './index.scss'
import React, {Component} from 'react'

import { Toast } from 'antd-mobile';

import axios from 'axios'
import ListView from '../../commons/ListView'
import BackTop from '../../commons/BackTop'

const GoodsItem = ({rowData, toDetail}) => {
//	return <div>123</div>
	let price = rowData.skuList[0].price
	toDetail = toDetail.bind(this,rowData.id)
	return (
		<li onClick = {toDetail} className = "goods-item">
			<div className = "img-box img-loading">
				<img width = "100%" src={rowData.skuList[0].image}/>
			</div>
			<div className = "name">{rowData.masterName}</div>
			<div className = "content">
				<span className = "price">${ (price/100).toFixed(2) }</span>
				<span className = "inventory">已售{rowData.displaySalesCount}</span>
			</div>
		</li>
	)
}

class List extends Component {
	
	constructor (props) {
		super(props)
		//能不放入到state里的就别放了
		this.state = {
			goods: [],
			isBackShow: false
		}
		this.page = 1;
		this.num = 10;
		this.distance = 30;
		this.loading = false;
		this.hasMore = true
		this.loadMore = this.loadMore.bind(this)
		this.backTop = this.backTop.bind(this)
		this.handleBackTop = this.handleBackTop.bind(this)
		this.toDetail = this.toDetail.bind(this)
	}
	
	toDetail (id) {
		this.props.history.push(`/detail/${id}`)
	}
	
	getGoods () {
		
		Toast.loading('Loading...',0,()=>{},true);
		
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
			if ( this.page*this.num >= res.data.data.total ) {
				this.hasMore = false
			}
			Toast.hide()
		})
	}
	
	componentWillMount () {
		this.getGoods()
		

	}
	
	backTop () {
		this.lv.scrollTo(0,0)
	}
	handleBackTop () {
		//监听滚动之后，判断回调顶部按钮是否出现
		if (document.documentElement.scrollTop > 500) {
			if(this.state.isBackShow) return false;
			this.setState({isBackShow:true})
		}else {
			if(!this.state.isBackShow) return false;
			this.setState({isBackShow:false})
		}
	}

	render () {
		
		//高阶组件！传入到ListView里，ListView就可以根据这个高阶组件来得到需要渲染的item组件
		let row = (rowData) => {
			return <GoodsItem toDetail = {this.toDetail} key = {rowData.id} rowData={rowData} />
		}
		
		let { goods, isBackShow } = this.state
		return (
			<div className = "page-footer list">
				<div className="title">—&nbsp;好货精选&nbsp;—</div>
				<ListView
					ref = {lv => this.lv = lv}
					data = {goods}
					row  = {row}
					distance = {50}
					loadMore = {this.loadMore}
					className = 'goods-box'
					onScroll = {this.handleBackTop}
				/>
				{
					!isBackShow || <BackTop onClick = {this.backTop}/>
				}
			</div>
		)
	}
	
	loadMore () {
		if( this.isLoading ) return false;
		if( !this.hasMore ) {
			
			Toast.info('没有更多了', 1)
			return false;
		}
		this.page++
		this.getGoods()
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