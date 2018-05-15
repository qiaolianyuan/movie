import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/main.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'swiper/dist/css/swiper.min.css'
import './modules/rem'
import 'antd-mobile/dist/antd-mobile.css'; 

import { 
	BrowserRouter as Router
} from 'react-router-dom'


import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
	<Provider store = {store}>
		<Router>
			<App />
		</Router>
	</Provider>
, document.getElementById('root'));


registerServiceWorker();
