 import React,{Component} from 'react';
//  import {Route, Switch,Redirect} from 'react-router-dom';
import { Layout } from 'antd';
import LeftNav from '../../components/leftnav/leftnav';
import {Route, Switch,Redirect} from 'react-router-dom';
import Header from '../../components/header/header';
import Appfooter from '../../components/appfooter/appfooter';
import Home from '../../components/home/home'
import Delete from '../../components/setting/delete/delete'
import Update from '../../components/setting/update/update'
import User from '../../components/user/user'
import Recycle from '../../components/recycle/recycle'
import History from '../../components/history/history'
import Folder from '../../components/files/folder/folder'
import Music from '../../components/files/music/music'
import Picture from '../../components/files/picture/picture'
import Video from '../../components/files/video/video'
import Other from '../../components/files/other/other'
import Usersettingpwd from '../../components/user/user-settingpwd/usersettingpwd'
const { Sider, Content } = Layout;
export default class Admin extends Component {
  render(){
    return(
      <Layout style={{minHeight: '100%'}}>
        <Sider><LeftNav/></Sider>
        <Layout>
        <Header>Header</Header>
          <Content style={{backgroundColor:'#fff',margin:15}}>
            <Switch>
              <Route path='/home' component={Home}></Route>
              <Route path='/setting/delete' component={Delete}></Route>
              <Route path='/user' component={User}></Route>
              <Route path='/setting/update' component={Update}></Route>
              <Route path='/recycle' component={Recycle}></Route>
              <Route path='/history' component={History}></Route>
              <Route path='/files/video' component={Video}></Route>
              <Route path='/files/music' component={Music}></Route>
              <Route path='/files/folder' component={Folder}></Route>
              <Route path='/files/other' component={Other}></Route>
              <Route path='/files/picture' component={Picture}></Route>
              <Redirect to='/home'></Redirect>
            </Switch>
          </Content>
          <Appfooter/>
        </Layout>
      </Layout>
  )}
}