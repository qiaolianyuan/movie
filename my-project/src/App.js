import React, { Component } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import actionCreator from './store/cars/actionCreator'
import {
	Route,
	Switch,
	Redirect,
	withRouter
} from 'react-router-dom'
import './stylesheets/App.scss';

import {
	Home, List, Cars, Mine, NotFound,Detail
} from './components/pages'

import NavBar from './components/commons/NavBar'

class App extends Component {
  
  
  componentWillMount () {
  	//在这里判断是否登陆，获取用户的购物车信息
  	 if (this.props.user.userInfo) {
  	 	this.props.getInitCars()
  	 }
  }
  
  
  
  renderFooter () {
  	//不需要底部的路由
  	let nonavbar = [ '/mine/login', '/detail']
  	let pathname = this.props.location.pathname 
  	//判断是否需要底部
  	let hasNav = nonavbar.every(item => {
  		if( pathname.startsWith(item) ) {
  			return false
  		}
  		return true
  	})
  	
  	return !hasNav || <NavBar/>
  }
  
  render() {
  	let { routes } = this.props
    return (
      <div>      
        <Switch>
	        {
	        	routes.map(item => {
	        		return <Route exact = {item.exact}  path={item.path} component = {item.component}  key = { item.id }/>
	        	})
	        }
        	<Redirect to = "/not-found" />
        </Switch>
               
        { this.renderFooter() }
      </div>
    );
  }
  
}
App.defaultProps = {
	
	routes: [
		{ id: 1, path: '/', component: Home, exact: true },
		{ id: 2, path: '/list', component: List },
		{ id: 3, path: '/cars', component: Cars },
		{ id: 4, path: '/mine', component: Mine },
		{ id: 5, path: '/not-found', component: NotFound },
		{ id: 6, path: '/detail/:id', component: Detail }
	]
	
}


export default withRouter(connect(state => state, dispatch => {
	return bindActionCreators(actionCreator, dispatch)
})(App));
