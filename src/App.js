// import logo from './logo.svg';
import './App.css';
import {createBrowserHistory} from 'history';
import {Router,Switch} from 'react-router'
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact'
import News from './pages/News/News'
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Detail from './pages/Detail/Detail';
// import Products from './Demo/Products';
export const history = createBrowserHistory();


function App() {
  return (
  <Router history={history}>
    <Switch>
        <HomeTemplate path='/home' exact Component={Home}/>
        <HomeTemplate path='/contact' exact Component={Contact}/>
        <HomeTemplate path='/news' exact Component={News}/>
        <HomeTemplate path='/detail/:id' exact Component={Detail}/>
        <HomeTemplate path='/login' exact Component={Login}/>
        <HomeTemplate path='/register' exact Component={Register}/>
        <HomeTemplate path='/' exact Component={Home}/>
    </Switch>
  </Router>
  // <Cart/>
  // <Products/>

  );
}

export default App;
