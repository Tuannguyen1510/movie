import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import { USER_LOGIN } from '../../util/config';
export default function CheckoutTemplate(props) {
    const {Component,...restProps} = props;
    if(!localStorage.getItem(USER_LOGIN)){
        return <Redirect to='/login'/>
    }
    return <Route {...restProps} render={(propsRoute) => {
        return <>
              <Component {...propsRoute}/>
        </>
 }}/>
}