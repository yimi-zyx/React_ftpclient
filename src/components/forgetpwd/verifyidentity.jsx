import React, { Component } from 'react'
import { Form, Icon, Input, Row,Col} from 'antd';
import memoryUtils from '../../utils/memoryUtils';
import Verifiedbutton from '../verifiedbutton/verifiedbutton';
export  class Verifyidentity extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const {phone} =memoryUtils.user
        const displayphone=phone.substring(0,3)+'******'+phone.substring(9,11);
        console.log(phone);
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
           <Form {...formItemLayout} className="blankinfo-form" ref={(form)=>this.form2=form}>
                <Form.Item label='账&nbsp;&nbsp;&nbsp;&nbsp;户：' >
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
                <Form.Item label='验证码'>
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
          </div>
        );
    }
}
const WrapVerifyidentity = Form.create()(Verifyidentity)
export default WrapVerifyidentity