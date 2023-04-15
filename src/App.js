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
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Films from "./pages/Admin/Films/Films";
import ShowTime from "./pages/Admin/ShowTime/ShowTime";
import AddFilms from "./pages/Admin/Films/AddFilms/AddFilms";
import Edit from "./pages/Admin/Films/Edit/Edit";

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
        <AdminTemplate path="/admin" exact Component={Dashboard}/>
        <AdminTemplate path="/admin/films" exact Component={Films}/>
        <AdminTemplate path="/admin/films/addnew" exact Component={AddFilms}/>
        <AdminTemplate path="/admin/films/edit/:maPhim" exact Component={Edit}/>
        <AdminTemplate path="/admin/users" exact Component={Dashboard}/>
        <AdminTemplate path="/admin/showtime" exact Component={ShowTime}/>
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
