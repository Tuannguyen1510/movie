import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'antd/dist/reset.css';
// 
import { Provider } from 'react-redux';
import { store } from './redux/configStore';
//
import './util/i18n' 
import './assets/css/Start.css'
import './assets/css/main.css'
import './App.scss'
//
// import "~slick-carousel/slick/slick.css"; 
// import "~slick-carousel/slick/slick-theme.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={store}>
<App />
</Provider>
 
);


