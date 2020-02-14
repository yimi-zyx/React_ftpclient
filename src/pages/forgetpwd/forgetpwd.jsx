import React, { Component } from 'react';
import './forgetpwd.less';
import Appheader from '../../components/apphead/appheader';
import Appfooter from '../../components/appfooter/appfooter';
import { Steps, Button, message } from 'antd';
import WrapBlankinfo from '../../components/forgetpwd/blankinfo';
import WrapVerifyidentity from '../../components/forgetpwd/verifyidentity';
import WrapSettingnewpwd from '../../components/forgetpwd/settingnewpwd'
import Finish from '../../components/forgetpwd/finish'
import memoryUtils from '../../utils/memoryUtils';
import {reqGetuser,reqSetpwd} from '../../api/index';
import storageUtils from '../../utils/storageUtils';
const { Step } = Steps;


export default class Forgetpwd extends Component {
    constructor(props) {
        super(props);
        this.state = {
          current: 0,
        };
    }
     //刷新验证码
    editCaptcha(){
        this.refs.vcode.src = '/captcha';
    }   
    prev(){
        
        const current = this.state.current -  1;
        this.setState({ current });
    }
     //提交表单
     handleSubmit1=(event)=>{
        //event.preventDefault();
        const form = this.form1.props.form;
        form.validateFields(async(err, values) => {
          //表单验证成功
          if (!err) { 
            const {account,captcha} = values;
            const result= await reqGetuser(account,captcha);
            if(result.status===1){
              memoryUtils.user=result.data;
              const current = this.state.current + 1;
              this.setState({ current });
              message.success("正确！");
            }else{

              message.error(result.msg);
              //this.editCaptcha();
            }
          }else{
            message.error('请正确输入!');
            //this.editCaptcha();
          }
        });
    }
    //提交表单
    handleSubmit2=(event)=>{
        //event.preventDefault();
        const form = this.form2.props.form;
        form.validateFields(async(err, values) => {
          //表单验证成功
          if (!err) {
            console.log('ok');
            message.success("验证成功！")
            const current = this.state.current + 1;
            this.setState({ current });
            console.log(memoryUtils.flag)
            // this.setState({ current });
          }else{
            message.error('验证错误!');
          }
        });
    }
    //提交表单
    handleSubmit3=(event)=>{
        //event.preventDefault();
        const form = this.form3.props.form;
        form.validateFields(async(err, values) => {
          //表单验证成功
          if (!err) {
            console.log(memoryUtils.user)
			const {password} = values;
            const {userid} = memoryUtils.user
            const result = await reqSetpwd(userid,password);
			if(result.status===1){
                memoryUtils.user.password=password;
                message.success("设置成功！");
                storageUtils.saveUser(memoryUtils.user);
                const current = this.state.current + 1;
                this.setState({ current });
			}else{
                message.error(result.msg);
			}}else{
            message.error('请正确输入!');
        }
        });
    }
    render() {
        const steps = [
            {
              title: '填写账户名',
              content: <WrapBlankinfo wrappedComponentRef={(form)=>this.form1=form} />,
              
            },
            {
              title: '验证身份',
              content: <WrapVerifyidentity wrappedComponentRef={(form)=>this.form2=form}/>,
            },
            {
              title: '设置新密码',
              content: <WrapSettingnewpwd wrappedComponentRef={(form)=>this.form3=form}/>,
            },
            {
              title: '完成',
              content: <Finish/>,
            },
          ];
        const { current } = this.state;
        return (
            <div className='forgetpwd'>
                <Appheader/>
                <div className='content'>
                    <section className='forgetpwd-content'>
                        <h2>找回密码</h2>
                        <div className='forgetpwd-content-steps'>
                            <Steps current={current} labelPlacement='vertical'>
                                {steps.map(item => (
                                    <Step key={item.title} title={item.title} />
                                ))}
                            </Steps>
                            <div className="steps-content">
                                {steps[current].content}
                            </div>
                            <div className="steps-action">
                        {current ===0 && (
                            <Button type="primary" className='steps-action-button' onClick={() => this.handleSubmit1()}>
                            下一步
                            </Button>
                        )}
                        {current ===1 && (
                            <Button type="primary" className='steps-action-button' onClick={() => this.handleSubmit2()}>
                            下一步
                            </Button>
                        )}
                        {current ===2 && (
                            <Button type="primary" className='steps-action-button' onClick={() => this.handleSubmit3()}>
                            下一步
                            </Button>
                        )}
                        {current > 0 && current<3 &&(
                            <Button style={{ marginLeft: 15}} className='steps-action-button' onClick={() => this.prev()}>
                            上一步
                            </Button>
                        )}
                        </div>  
                        </div>
                    </section>
                </div>
                <Appfooter/>
            </div>
        )
    }
}
