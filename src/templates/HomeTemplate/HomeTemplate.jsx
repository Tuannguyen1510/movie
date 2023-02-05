
import {Route} from 'react-router'
import Header from './Layout/Header/Header';
import HomeCarousel from './Layout/HomeCarousel/HomeCarousel';
import Footer from './Layout/Footer/Footer'
export const HomeTemplate = (props) => {
    const {Component,...restProps} = props;
    return <Route {...restProps} render={(propsRoute) => {
           return <>
                 <Header {...propsRoute}/>
               

                 <Component {...propsRoute}/>

                 <Footer/>
           </>
    }}/>
}