import React, { Component } from 'react'
import { Form, Icon, Input, Button,message} from 'antd';
import memoryUtils from '../../../utils/memoryUtils';
import storageUtils from '../../../utils/storageUtils';
import {reqSetpwd} from '../../../api/index';
import './usersettingpwd.less'
export  class Usersettingpwd extends Component {
    // 判断两次密码是否一致
    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
          callback('两次输入的密码不正确!');
        } else {
          callback();
        }
    };
      //提交表单
    handleSubmit=(event)=>{
        event.preventDefault();
        const form = this.props.form;
        form.validateFields(async(err, values) => {
            //表单验证成功
            if (!err) {
                const {password} = values;
                const {userid} = memoryUtils.user
        
                const result = await reqSetpwd(userid,password);
                if(result.status===1){
                    memoryUtils.user.password=password;
                    message.success("设置成功！");
                    storageUtils.saveUser(memoryUtils.user);
                }else{
                    message.error(result.msg);
                }
            }else{
                message.error('请正确输入!');
            }
        });
    }
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
        const {username} =memoryUtils.user
        return (
            <div className='usersettingpwd'>
                <h1>请设置新密码</h1>
                <section className='usersettingpwd-content'>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit} className="usersettingpwd-form">
                        <Form.Item label='账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;户：' >
                            {
                            getFieldDecorator('username', {
                            initialValue:username
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type='text'
                            readOnly
                            />
                        )}
                        </Form.Item>
                        {/* 密码 */}
                        <Form.Item label="新&nbsp;&nbsp;密&nbsp;&nbsp;码" hasFeedback>
                            {getFieldDecorator('password', {
                            rules: [
                                {required: true,message: '请输入密码!',},
                                { min:6 , message:'密码最少6位字符!'},
                                { max:12 , message:'密码最多12位字符!'},
                                { pattern: /(?![a-z]+$|[0-9]+$|_+$)^[a-zA-Z0-9_]+$/,message:'密码必须包含字母、数字字符、下划线两种'}],
                            })(<Input.Password 
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="请输入密码"/>)}
                        </Form.Item>
                        {/* 确认密码 */}
                        <Form.Item label="确认密码" hasFeedback>
                            {getFieldDecorator('confirm', {
                            rules: [
                                {
                                required: true,
                                message: '请确认密码!',
                                },
                                {
                                validator: this.compareToFirstPassword,
                                },
                            ],
                            })(<Input.Password 
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="请确认密码" 
                            onBlur={this.handleConfirmBlur} />)}
                        </Form.Item>
                        <Form.Item >
                            <Button  type="primary" htmlType="submit" className="usersettingpwd-form-button" style={{width:200}}>
                            确定
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
const WrapUserSettingnewpwd = Form.create()(Usersettingpwd)
export default WrapUserSettingnewpwd