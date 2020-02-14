import React, { Component } from 'react'
import { Icon} from 'antd';
import './finish.less'
import Linkbutton from '../../components/linkbutton/linkbutton'
export default class Finish extends Component {
    render() {
        return (
            <div className='finish-content'>
                <Icon type="check" className='finish-content-icon' />
                <span className='finish-content-text'>新密码设置成功！</span>
                <div className='finish-content-link'>现在你可以：
                    <Linkbutton style={{fontWeight:'bolder' ,fontSize: 18}} href='/login' >
                        立即登录
                    </Linkbutton>
                </div>
            </div>
        )
    }
}
