import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

// Prod
//axios.defaults.baseURL = 'http://server818748.nazwa.pl/rarpanel/api';

// Dev
axios.defaults.baseURL = 'http://localhost:8000/api';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
