import { Button} from 'antd';
import React, { Component } from 'react'
export default class Verifiedbutton extends Component {
   
    state = {
        　　loading: false,
        　　yztime: 59,
        };
         
        //倒计60s
        count = () => {
        　　let { yztime } = this.state;
        　　let siv = setInterval(() => {
        　　　　this.setState({ yztime: (yztime--) }, () => {
                    console.log(yztime)
        　　　　　　if (yztime <= -1) {
        　　　　　　　　clearInterval(siv);　　//倒计时( setInterval() 函数会每秒执行一次函数)，用 clearInterval() 来停止执行:
        　　　　　　　　this.setState({ loading: false, yztime: 59 })
        　　　　　　}
        　　　　});
        　　}, 1000);
        }
         
        //短信验证
        verifiedSubmit = (e) => {
        　　this.setState({ loading: true });
        　　e.preventDefault();
        　　　　if (this.state.yztime !== 0) {
        　　　　　　this.count();
        　　　　}
        }
 

    render() {
        　　return (
　　　　　　　　<Button loading={this.state.loading} onClick={this.verifiedSubmit} style={{width:100}}>
                    {this.state.loading ? this.state.yztime + '(s)' : '获取验证码'}
　　　　　　　　</Button>
        　　);
        }
}
// const Wraperifiedbutton= Form.create()(Verifiedbutton)
// export default Wraperifiedbutton
