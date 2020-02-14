import React, { Component } from 'react'
import './user-home.less';
import {Link, withRouter} from 'react-router-dom';
import { Rate ,Avatar,Upload,Icon, message,Modal} from 'antd';
const { confirm } = Modal;
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
  
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

  
export class Userhome extends Component {
    state = {
        loading: false,
    };
    showConfirm=()=>{
    confirm({
        title: '是否确定注销账号?',
        content: '账号注销后将无法找回，请谨慎操作！',
        okText: '确认',
        cancelText: '取消',
        onOk() {
        console.log('OK');
        },
        onCancel() {
        console.log('Cancel');
        },
    });
}
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
                imageUrl,
                loading: false,
            }),
            );
        }
    };
    render() {
        const uploadButton = (
            <Avatar shape="circle" size={70} icon="user" />
          );
        const { imageUrl } = this.state;
        return (
            <div className='user'>
                <div className='user-top'>
                    <div className='user-top-info'>
                        <Upload name="avatar"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={this.handleChange}
                        >
                            {imageUrl ? <Avatar shape="circle" size={70} src={imageUrl} alt="avatar" /> : uploadButton}
                        </Upload>
                        <span>xxxx</span>
                    </div>
                    <div className='user-top-rate'>
                        <Rate disabled defaultValue={3}/>
                        <p>账户安全评分</p>
                    </div>
                </div>
                <div className='user-content'>
                    <div className='user-content-setting'>
                        <Icon type='setting'/>
                        <span>设置密码</span>
                        <h2>密码设置完成，可重新设置！</h2>
                        <Link to="/user/_settingpwd">去设置></Link>
                    </div>
                    <div className='user-content-setting'>
                        <Icon type='tool'/>
                        <span>绑定手机号</span>
                        <h2>已绑定手机号，可重新绑定！</h2>
                        <Link to="/user/_settingphone">去绑定></Link>
                    </div>
                    <div className='user-content-setting'>
                        <Icon type='tool'/>
                        <span>绑定邮箱</span>
                        <h2>已绑定邮箱，可重新绑定！</h2>
                        <Link to='/user/_setting'>去绑定></Link>
                    </div>
                    <div className='user-content-setting'>
                        <Icon type='user-delete'/>
                        <span>注销账号</span>
                        <h2>请谨慎点击！</h2>
                        <button onClick={()=>this.showConfirm()}>注销></button>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Userhome)