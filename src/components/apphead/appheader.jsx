import React, { Component } from 'react'
import logo from '../../assets/image/logo.png';
import './appheader.less'
export default class Header extends Component {
    render() {
        return (
            <header className="login-header">
                <img src={logo} alt="logo" />
                <h1>文件同步系统</h1>
            </header>
        )
    }
}
