
import './index.scss'
import React from 'react'


const BackTop = props => {
	
	return (
		<div onClick = {props.onClick} className = "back-top">
			<i className = "fa fa-arrow-up"></i>
		</div>
	)

	
}

export default BackTop
