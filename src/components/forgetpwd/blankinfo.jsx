import React, { Component } from 'react'
import { Form, Icon, Input,Row,Col} from 'antd';
export  class Blankinfo extends Component {

  //刷新验证码
  editCaptcha(){
    this.refs.vcode.src = '/captcha';
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
        return (
          <div>
           <Form {...formItemLayout} onSubmit={this.handleSubmit} className="blankinfo-form" ref={(form)=>this.form1=form}>
                <Form.Item label='账&nbsp;&nbsp;&nbsp;&nbsp;户：' hasFeedback >
                {
                  getFieldDecorator('account', {
                    rules:[
                      { required: true, whitespace:true,message: '请输入用户名/手机号/邮箱号!' },
                    ]
                  })(
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type='text'
                      placeholder="请输入用户名/手机号/邮箱号"
                    />
                  )
                }
                </Form.Item>
                <Form.Item label='验证码'>
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
                        <button  type='button' onClick={()=>this.editCaptcha()} style={{border:'none',outline: 'none'}}>
                          <img src='/captcha' alt='验证码' ref='vcode'/>
                        </button>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
          </div>
        );
    }
}
const WrapBlankinfo = Form.create()(Blankinfo)
export default WrapBlankinfo