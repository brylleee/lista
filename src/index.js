import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Don't make any changes here! This script just initializes our main component and starts it

const startApp = () => {
	const root = ReactDOM.createRoot(document.getElementById('root'));
	root.render(<App />);
};

// Check if this is on Cordova Application then add an event listener for device ready first
// Else just start the app
if(window.cordova) {
	document.addEventListener('deviceready', startApp, false);
} else {
	startApp();
}
