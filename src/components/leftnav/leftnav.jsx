import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import logo from '../../assets/image/logo.png'
import {Link, withRouter} from 'react-router-dom';
import meunlist from '../../config/menuconfig';
import './leftnav.less';
const { SubMenu } = Menu;
export class LeftNav extends Component {
    /*
    动态检测菜单，并生成菜单
  */
    getmeunlist=(meunlist)=>{
    return meunlist.map( item=>{
        if(!item.children){
        return(
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        );
        }else{
        const path = this.props.location.pathname;
        
        //查找一个与当前请求路径匹配的子Item
        const citem= item.children.find(citem=>citem.key===path)
        if(citem){
            this.openkey = item.key;
            }
            return(
            <SubMenu
            key={item.key}
            title={
                <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
                </span>
            }
            >
            {
                this.getmeunlist(item.children)// 递归调用children，生成子菜单 
            }
            </SubMenu>
            );
        }
        })
    }
    //在render()之前渲染
    componentWillMount(){
        this.meunlistNodes=this.getmeunlist(meunlist);
    }
    render() {
        const path = this.props.location.pathname;
        const newpath=path.split('/_')[0]
        console.log(path.split('/_')[0])
        return (
        <div className="left-nav">
            <Link to='/' className="left-nav-header">
                <img src={logo} alt="logo"/>
                <h1>文件同步</h1>
            </Link>
            <Menu 
            selectedKeys={[newpath]}
            defaultOpenKeys={[this.openkey]}
            mode="inline"
            theme="dark"
            >
            {this.meunlistNodes}
            </Menu>
        </div>
        )
    }
}

/*
withRouter高阶组件:
包装非路由组件, 返回一个新的组件
新的组件向非路由组件传递3个属性: history/location/match
 */
export default withRouter(LeftNav)