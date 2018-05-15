
import './index.scss'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actionCreator from '../../../store/allen/actionCreator'


const ContentItem = ({info}) => {
	return (
		<li className = "">
			{info.masterName}
		</li>
	)
}

class Content extends Component {
	componentWillMount () {
		if(this.props.homelist.length<=0){
			this.props.getHomeList()
		}
	}
	render () {
		let { homelist } = this.props
		console.log(homelist)
		return (
			<div className = "content">
				<ul>
					{
						homelist.map(item => {
							return <ContentItem key = {item.id} info = {item} />
						})
					}
				</ul>
			</div>
		)
	}
	
}

export default connect(state => {
	return {
		homelist: state.allen.homelist
	}
}, dispatch => {
	return bindActionCreators(actionCreator, dispatch)
})(Content)
