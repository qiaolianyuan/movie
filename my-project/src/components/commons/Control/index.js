
import './index.scss'
import React, {Component} from 'react'


class Control extends Component {
	
	
	render () {
		let { num, controlNum } = this.props
		return (
			
				<div className = "count-body">
					<div className="count-type">
						<span onClick = {controlNum.bind(this, false)} className={"icon left"+(num!==1?'':' disable')}>-</span>
						<span className="center">{num}</span>
						<span onClick = {controlNum.bind(this, true)} className="count-no-border icon right">+</span>
					</div>
				</div>

		)
	}
	
}

export default Control
