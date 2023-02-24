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
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={store}>
<App />
</Provider>
 
);


