// import logo from './logo.svg';
import "./App.css";
import { createBrowserHistory } from "history";
import { Router, Switch } from "react-router";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Detail from "./pages/Detail/Detail";
import Checkout from "./pages/Checkout/Checkout";
import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
// import Products from './Demo/Products';
import { Suspense, lazy } from "react";
import UserTemplate from "./templates/UserTemplate/UserTemplate";

// const CheckoutTemplate = lazy(() => import ('./templates/CheckoutTemplate/CheckoutTemplate'))
export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/contact" exact Component={Contact} />
        <HomeTemplate path="/news" exact Component={News} />
        <HomeTemplate path="/detail/:maPhim" exact Component={Detail} />
        {/* <HomeTemplate path="/login" exact Component={Login} /> */}
        <HomeTemplate path="/register" exact Component={Register} />

        <UserTemplate path="/login" exact Component={Login}/>

        {/* <Suspense fallback={<h1>LOADING....</h1>}> */}
        <CheckoutTemplate path='/checkout/:maLichChieu' exact Component={Checkout}/>
        {/* </Suspense> */}

        <HomeTemplate path="/" exact Component={Home} />
      </Switch>
    </Router>
    // <Cart/>
    // <Products/>
  );
}

export default App;
