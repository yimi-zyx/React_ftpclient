import React, { Component } from 'react';
import {Button,Modal,Form, Icon, Input ,Row,Col} from 'antd';
import './usersettingphone.less';
import memoryUtils from '../../../utils/memoryUtils.js';
import Verifiedbutton from '../../verifiedbutton/verifiedbutton';
class Userverifyphone extends Component {
    render() {
        const {phone}=memoryUtils.user;
        const displayphone=phone.substring(0,3)+'******'+phone.substring(9,11);
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
             span:5
            },
            wrapperCol: {
               span: 19 
            },
        };
        return (    
            <Form {...formItemLayout} onSubmit={this.handleSubmit} ref={(form)=>this.form1=form}>
            <Form.Item>
            {
            getFieldDecorator('phone', {
                initialValue:displayphone
            })(
                <Input
                prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type='phone'
                readOnly
                />
            )
            }
            </Form.Item>
            <Form.Item>
                <Row gutter={20}>
                    <Col span={14} >
                    {getFieldDecorator('captcha', {
                        rules: [{ required: true, message: '请输入验证码!' }],
                    })(<Input
                        prefix={<Icon type="picture" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="请输入验证码" 
                        />)
                    }
                    </Col>
                    <Col span={10}>
                    <Verifiedbutton/>
                    </Col>
                </Row>
            </Form.Item>
        </Form>
        )
    }
}
const WrapUserverifyphone = Form.create()(Userverifyphone);
class Userupdatephone extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
             span:5
            },
            wrapperCol: {
               span: 19 
            },
        };
        return (    
        <Form {...formItemLayout} onSubmit={this.handleSubmit} ref={(form)=>this.form2=form}>
            <Form.Item>
            {getFieldDecorator('phone', {
                rules: [{ required: true, message: '请输入手机号!' },
                { pattern: /^((13[0-9])|(15[^4])|(18[0|1|5-9])|(17[7])|(19[9]))\d{8}$/,message:'请正确输入手机号'}],
                })(<Input 
                prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="phone"
                placeholder="请输入手机号" 
                
                />)}
            </Form.Item>
            <Form.Item>
                <Row gutter={20}>
                    <Col span={14} >
                    {getFieldDecorator('Captcha', {
                        rules: [{ required: true, message: '请输入验证码!' }],
                    })(<Input
                        prefix={<Icon type="picture" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="请输入验证码" 
                        />)
                    }
                    </Col>
                    <Col span={10}>
                    <Verifiedbutton/>
                    </Col>
                </Row>
            </Form.Item>
        </Form>      
        )
    }
}
const WrapUserupdatephone = Form.create()(Userupdatephone);
class Usersettingphone extends Component {
    state = { visible: false ,visible2: false};

    showModal = () => {
        this.setState({
        visible: true,
        });
    };
    handleOk = e => {
        //console.log(e);
        const form = this.form1.props.form;
        form.validateFields(async(err, values) => {
          //表单验证成功
          if (!err) {
            console.log(values);
            this.setState({
                visible: false,
            });
            this.setState({
                visible2: true,
            });
          }else{
            console.log('验证错误!');
          }
        });
        
    };

    handleCancel = e => {
        console.log('取消');
        this.setState({
        visible: false,
        });
    };
    handleOk2 = e => {
        //console.log(e);
        const form = this.form2.props.form;
        form.validateFields(async(err, values) => {
          //表单验证成功
          if (!err) {
            console.log(values);
           
            this.setState({
                visible2: false,
            });
          }else{
            console.log('验证错误!');
          }
        });
        
    };

    handleCancel2 = e => {
        console.log('取消');
        this.setState({
        visible2: false,
        });
    };
    render() {
        const {phone}=memoryUtils.user;
        const displayphone=phone.substring(0,3)+'******'+phone.substring(9,11);
        return (
            <div className='Usersettingphone'>
                <h1>已绑定手机号</h1>
                <h2>{displayphone}</h2>
                <h3>一个手机号只能绑定一个账号。绑定手机号将作为您身份验证的重要方式，请谨慎操作！</h3>
                <Button type="primary" onClick={this.showModal} style={{width:150}}>更换手机号</Button>
                <Modal
                    title="绑定手机"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    destroyOnClose={true}
                    forceRender={true}
                    okText='确定'
                    cancelText='取消'
                    width='400px'>
                    <h4>一个手机号只能绑定一个账号，为了你的账户安全必须进行身份验证！</h4>
                    <h5>验证方式：手机</h5>
                    <WrapUserverifyphone wrappedComponentRef={(form)=>this.form1=form}/>
                </Modal>
                <Modal
                    title="绑定手机"
                    visible={this.state.visible2}
                    onOk={this.handleOk2}
                    onCancel={this.handleCancel2}
                    destroyOnClose={true}
                    forceRender={true}
                    okText='确定'
                    cancelText='取消'
                    width='400px'>
                    <h4>您可以使用此手机号进行找回密码等操作！</h4>
                    <h5>请勿随意泄露手机号，以防泄露账号信息！</h5>
                   <WrapUserupdatephone wrappedComponentRef={(form)=>this.form2=form}/>
                </Modal>
            </div>
        )
    }
}
const WrapUsersettingphone = Form.create()(Usersettingphone)
export default WrapUsersettingphone