import React, { Component } from 'react'
import { Form, Icon, Input} from 'antd';
export  class Settingnewpwd extends Component {
     // 判断两次密码是否一致
     compareToFirstPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && value !== form.getFieldValue('password')) {
        callback('两次输入的密码不正确!');
      } else {
        callback();
      }
    };
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
          <div>
           <Form {...formItemLayout} className="blankinfo-form" ref={(form)=>this.form3=form}>
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
            </Form>
          </div>
        );
    }
}
const WrapSettingnewpwd = Form.create()(Settingnewpwd)
export default WrapSettingnewpwd