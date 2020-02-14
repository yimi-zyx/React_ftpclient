import React,{Component} from 'react';
import { Form,
  Input,
  Icon,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  message} from 'antd';
import {reqRegister} from '../../api/index';
import './register.less'
import LinkButton from '../../components/linkbutton/linkbutton';
import Appheader from '../../components/apphead/appheader';
import Appfooter from '../../components/appfooter/appfooter';
// import memoryUtils from '../../utils/memoryUtils';
// import storageUtils from '../../utils/storageUtils';
// import {Redirect} from 'react-router-dom';

const { Option } = Select;
  
export class Register extends Component {


   //刷新验证码
   editCaptcha(){
    this.refs.vcode.src = '/captcha';
  }

  // 提交表单
    handleSubmit = e => {
      e.preventDefault();
      const form = this.props.form;
      form.validateFields(async(err, values) => {
        if (!err) {
          const {username,password,email,phone,captcha}=values;
          console.log('Received values of form: ', username,password,email,phone,captcha);
          const result = await reqRegister(username,password,email,phone,captcha);
          if(result.status === 1){//请求成功
            message.success('注册成功！');
            this.props.history.replace('/login');
          }else{
            message.error("注册失败："+result.msg+"!");
            this.editCaptcha();
          }
        }else{
          message.error("请正确输入！");
          this.editCaptcha();
        }
      });
    };

  // 判断两次密码是否一致
    compareToFirstPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && value !== form.getFieldValue('password')) {
        callback('两次输入的密码不正确!');
      } else {
        callback();
      }
    };
    //判断是否同意协议
    isagreement=(rule, value, callback)=>{
      if(!value){
        callback('请先阅读并同意协议');
      }else{
        callback();
      }
    }
    render(){
      const form = this.props.form;
      const {getFieldDecorator} = form;
      const formItemLayout = {
        labelCol: {
          span:5
         },
         wrapperCol: {
            span: 19 
         },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          span:16,
          offset:6
        },
      };
      const prefixSelector = getFieldDecorator('prefix', {
        initialValue: '86',
      })(
        <Select style={{ width: 70 }}>
          <Option value="86">+86</Option>
        </Select>,
      );
  
        return(
        <div className="register">
          <Appheader/>
          <div className='content'>
            <section className="register-content">
              <h2>用户注册</h2>
              <Form {...formItemLayout} onSubmit={this.handleSubmit} className="register-form">

              {/* 用户名 */}
              <Form.Item hasFeedback label='用户名'>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入用户名!', whitespace: true },
                  { min:6 , message:'用户名最少6位字符!'},
                  { max:12 , message:'用户名最多12位字符!'},
                  { pattern: /(?![a-z]+$|[0-9]+$|_+$)^[a-zA-Z0-9_]+$/,message:'用户名必须包含字母、数字字符、下划线两种'}],
                })(<Input
                   prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                   placeholder="请输入用户名"/>)}
              </Form.Item>
              {/* E-mail */}
              <Form.Item label="E-mail" hasFeedback>
                {getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: '请输入正确的E-mail!',
                    },
                    {
                      required: true,
                      message: '请输入E-mail!',
                    },
                  ],
                })(<Input 
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入E-mail"/>)}
              </Form.Item>
              {/* 密码 */}
              <Form.Item label="密  码" hasFeedback>
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
              {/* 手机号 */}
              <Form.Item label="手机号" hasFeedback>
                {getFieldDecorator('phone', {
                  rules: [{ required: true, message: '请输入手机号!' },
                  { pattern: /^((13[0-9])|(15[^4])|(18[0|1|5-9])|(17[7])|(19[9]))\d{8}$/,message:'请正确输入手机号'}],
                })(<Input 
                  prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="phone"
                  placeholder="请输入手机号" 
                  addonBefore={prefixSelector} style={{ width: '100%' }} />)}
              </Form.Item>
              {/* 验证码 */}
              <Form.Item label="验证码" extra="We must make sure that your are a human." >
                <Row gutter={22}>
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
                     <button  type='button' onClick={()=>this.editCaptcha()} style={{border:'none',outline: 'none'}}>
                      <img src='/captcha' alt='验证码' ref='vcode'/>
                    </button>
                  </Col>
                </Row>
              </Form.Item>
              {/* 同意协议 */}
              <Form.Item {...tailFormItemLayout}>
                {getFieldDecorator('agreement', {
                  valuePropName: 'checked',
                  rules: [{validator:this.isagreement }]
                })(
                  <Checkbox >
                    I have read the <LinkButton type='button'>agreement</LinkButton>
                  </Checkbox>,
                )}
              </Form.Item>
              {/* 提交 */}
              <Form.Item >
                <Button type="primary" htmlType="submit" className='register-form-button'> 
                  Register
                </Button>
              </Form.Item>
            </Form>
          </section>
          </div>
          <Appfooter/>
        </div>
        )
    }
}

const WrapRegister = Form.create()(Register)
export default WrapRegister