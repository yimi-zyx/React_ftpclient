import React,{Component} from 'react';
import { Form, Icon, Input, Button, Checkbox,message ,Row,Col} from 'antd';
import './login.less';
import Appheader from '../../components/apphead/appheader';
import Linkbutton from '../../components/linkbutton/linkbutton'
import {reqLogin} from '../../api/index';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import {Redirect} from 'react-router-dom';
import Appfooter from '../../components/appfooter/appfooter';
export class Login extends Component {

   //刷新验证码
   editCaptcha(){
    this.refs.vcode.src = '/captcha';
  }
  //提交表单
    handleSubmit=(event)=>{
      event.preventDefault();
      const form = this.props.form;
      form.validateFields(async(err, values) => {
        //表单验证成功
        if (!err) {
          //请求登录
          const {username,password,captcha,remember} = values
          const result = await reqLogin(username,password,captcha);
          if(result.status === 1){//请求成功
            console.log("登录成功")
            message.success('登录成功');
            // 保存user
            const user = result.data;
            memoryUtils.user = user // 保存在内存中
            storageUtils.saveUser(user);// 保存到local中
            if(remember){
              storageUtils.saveRemember('1');
            }
            this.props.history.replace('/');
          }else{
            message.error("登录失败："+result.msg);
            this.editCaptcha();
          }
        }else{
          message.error('请正确输入!');
          this.editCaptcha();
        }
      });
    }
  /*
    自定义：密码验证
      a)密码最少6个字符
      b)密码最大12个字符
      c)密码必须包含字母、数字字符、下划线
   */
    Passwordtest=(rule, value, callback)=>{
      if(!value){
        callback('请输入密码!');
      }else if(value.length<6){
        callback('密码最少6位字符!!');
      }else if(value.length>12){
        callback('密码最多12位字符!!');
      }else if(!/^[a-zA-Z0-9_]+$/.test()){
        callback('密码必须包含字母、数字字符、下划线中的两种!');
      }else{
        callback();
      }
    }

    render(){
    //如果用户已经登陆, 自动跳转到管理界面
    const flag=storageUtils.getRemember();
    if(flag){
      return <Redirect to='/'/>
    }
    //记住用户、忘记密码布局
    const formItemLayout = {
      labelCol: {
       span:5
      },
      wrapperCol: {
         span: 19 
      },
    };
    //提交布局
    const tailFormItemLayout = {
      wrapperCol: {
       span: 22,
       offset:1
      },
    };
      const form = this.props.form;
      const {getFieldDecorator} = form;
        return(
        <div className="login">
          <Appheader/>
          <div className='content'>
            <section className="login-content">
              <h2>用户登录</h2>
              <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-form">
                <Form.Item label='用户名：' hasFeedback >
                {
                  getFieldDecorator('username', {
                    /*
                      自定义：密码验证
                        a)密码最少6个字符
                        b)密码最大12个字符
                        c)密码必须包含字母、数字字符、下划线
                    */
                    rules:[
                      { required: true, whitespace:true,message: '请输入用户名!' },
                      { min:6 , message:'用户名最少6位字符!'},
                      { max:12 , message:'用户名最多12位字符!'},
                      { pattern: /(?![a-z]+$|[0-9]+$|_+$)^[a-zA-Z0-9_]+$/,message:'用户名必须包含字母、数字字符、下划线两种'}
                    ]
                  })(
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type='text'
                      placeholder="请输入用户名"
                    />
                  )
                }
              </Form.Item>
                <Form.Item label='密&nbsp;&nbsp;&nbsp;&nbsp;码：' hasFeedback>
                  {
                    getFieldDecorator('password', {
                      rules:[{validator:this.Passwordtest}]
                    })(
                      <Input.Password
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="请输入密码"
                    />,
                    )
                  }
                </Form.Item>
                <Form.Item label='验证码'>
                  <Row gutter={11}>
                    <Col span={14} >
                      {getFieldDecorator('captcha', {
                        rules: [{ required: true, message: 'Please input the captcha you got!' }],
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
                <Form.Item {...tailFormItemLayout}>
                  <Row  gutter={11}>
                    <Col span={8} >
                    { 
                    getFieldDecorator('remember',{
                      valuePropName: 'checked',//子节点的值的属性
                      initialValue: true,//子节点的初始值
                    })(<Checkbox>记住我</Checkbox>)
                    }
                  </Col>
                    <Col span={10}></Col>
                    <Linkbutton type='button' className="login-form-forgot">
                      忘记密码？
                    </Linkbutton>
                  </Row>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    登陆
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
/*
1.高阶函数
   1).一类特别的函数
       a.接受函数类型的参数
       b.返回值是函数
   2)常见
      a.定时器：setTimeout()/setInterval()
      b.Promise:Promise(()=>{}).then()
      c.数字遍历相关函数：
      d.函数对象bind()
   3).高阶函数更新动态，更加具有扩展性
2.高阶组件
  1)本质是一个函数
  2)接收一个组件(被包装组件)，返回一个新的组件(包装组件),包装组件会向被包装组件传入特定的属性
  3)作用:扩展组件功能
  */
/*
包装From组件生成一个新的组件：From(login)
新组件会向From组件传递一个强大的对象属性：from
*/ 
const WrapLogin = Form.create()(Login)
export default WrapLogin