import { Carousel } from 'antd-mobile';
import React, {Component} from 'react'
class Banner extends React.Component {
  //挂载默认的状态

  renderBanner () {
  	if (this.props.banners.length<=0) {
  		return ''
  	}
  	
  	return (
  		<Carousel
          autoplay={false}
          infinite
        >
          {this.props.banners.map((item, i) => (
            
              <div key = {i} className = "img-box img-loading">
              	<img width = "100%" src={item} />
              </div>
           
          ))}
        </Carousel>
  	)
  }
  render() {
    return (
     
        <div className = "banner">
        	{this.renderBanner()}
        </div>
    
    );
  }
}

export default Banner