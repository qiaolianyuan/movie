
import './index.scss'
import React, {Component} from 'react'
import axios from 'axios'

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
	
	constructor (props) {
		super(props)
		this.state = {
			boardlist: []
		}
	}
	getBoardList () {
		axios.get('/mz/v4/api/billboard/home',{
			params: {__t: Date.now()}
		}).then (res => {
			console.log(res.data.data.billboards)
			this.setState({
				boardlist: res.data.data.billboards
			})
			
//			setTimeout(() => {
//				new Swiper(this.el, {
//					pagination:{el: '.swiper-pagination'}
//				})
//			},0)
		})
	}
	componentWillMount () {
		this.getBoardList()
	}
	
	render () {
		let { boardlist } = this.state
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
	
	componentDidUpdate () {
		//谨慎一点，考虑到是否其他无关数据的影响
		new Swiper(this.el, {
			pagination:{el: '.swiper-pagination'}
		})
	}
}

export default Banner
