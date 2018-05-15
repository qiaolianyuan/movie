
import {
	CHANGE_CARS
} from './const'
import store from '../index'
export default {
	getInitCars () {//获取初始化的数据
		return dispatch => {
			
			setTimeout(() => {				
				let cars = localStorage.cars?JSON.parse(localStorage.cars):[]
				dispatch({
					type: CHANGE_CARS,
					cars
				})				
			},500)
			
		}
	},
	addGoodInCar ({id, masterName, price, num}) {//加入购物车
		return dispatch => {
			
			setTimeout(() => {
				//应该发送ajax请求，让后端将数据添加到数据库里之后，前端再做store的同步
				//这些都是后端的逻辑
				let cars = store.getState().cars.cars.slice()
				//有没有这个商品
				let isHas = cars.some(item => {
					if ( item.id === id ) {
						
						item.num += num
						
						return true
					}
					return false
				})
				//如果没有这个商品
				if ( !isHas ) {					
					cars.push({
						id,masterName,price, num: num
					})			
				}
				
				
				localStorage.cars = JSON.stringify(cars)
				
				dispatch({
					type: CHANGE_CARS,
					cars
				})
				
				
			}, 300)
			
			
		}
	},
	reduceGoodInCar ({id, num}) {//加入购物车
		return dispatch => {
			
			setTimeout(() => {
				//应该发送ajax请求，让后端将数据添加到数据库里之后，前端再做store的同步
				//这些都是后端的逻辑
				let cars = store.getState().cars.cars.slice()
				//有没有这个商品
				cars = cars.filter(item => {
					if ( item.id === id ) {						
						item.num -= num
						if ( item.num<= 0 ){
							return false
						}
						return true
					}
					return true
				})
				localStorage.cars = JSON.stringify(cars)			
				dispatch({
					type: CHANGE_CARS,
					cars
				})
				
				
			}, 300)
			
			
		}
	}
	
}
