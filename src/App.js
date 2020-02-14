import React,{Component} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import Login from './pages/login/login';
import Register from './pages/register/register';
import Admin from './pages/admin/admin';
import Forgetpwd from './pages/forgetpwd/forgetpwd'
// import { Button } from 'antd';
export default class App extends Component {
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route path='/forgetpwd' component={Forgetpwd}></Route>
                    <Route path="/" component={Admin}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}
