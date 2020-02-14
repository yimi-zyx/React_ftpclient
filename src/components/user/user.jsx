import React, { Component } from 'react'
import {Route, Switch,Redirect} from 'react-router-dom';
import Userhome from './user-home/user-home';
import Usersettingpwd from './user-settingpwd/usersettingpwd';
import Usersettingphone from './user-settingphone/usersettingphone'
import Verifiedbutton from '../verifiedbutton/verifiedbutton'
export default class user extends Component {
    render() {
        return (
            <div>
                <Switch>V
                    <Route path='/user/_settingpwd' component={Usersettingpwd}></Route>
                    <Route path='/user/_setting' component={Verifiedbutton}></Route>
                    <Route path='/user/_settingphone' component={Usersettingphone}></Route>
                    <Route path='/user' component={Userhome}></Route>
                    <Redirect to='/user'></Redirect>
                </Switch>
            </div>
        )
    }
}
