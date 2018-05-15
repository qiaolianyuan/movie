
import './index.scss'
import React, {Component} from 'react'
import { Link, NavLink } from 'react-router-dom'



const NavItem = ({ info }) => {
	let { icon, title, path, exact } = info
	return (
		<NavLink activeClassName = {'active'}  exact = {exact} to = {path}>
			<i className = {`fa fa-${icon}`}></i>
			<span>{title}</span>
		</NavLink>
	)
}

class NavBar extends Component {
	
	
	render () {
		let { navs } = this.props
		return (
			<footer className = "app-nav-bar">
				
				{
					navs.map(item => {
						return <NavItem info = {item} key = {item.id} />
					})
				}
				
			</footer>
		)
	}
	
}

NavBar.defaultProps = {
	navs: [
		{id: 1, title: '首页', icon: 'home', path: '/',exact: true},
		{id: 2, title: '列表', icon: 'list', path: '/list'},
		{id: 3, title: '购物车', icon: 'opencart', path: '/cars'},
		{id: 4, title: '我的', icon: 'user-circle-o', path: '/mine'}
	]
}

export default NavBar
