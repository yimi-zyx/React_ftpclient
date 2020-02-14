/*
能发送异步ajax请求的函数模块
封装axios库
函数返回值是promise
*/
import axios from 'axios';
// import {message} from 'antd';
axios.defaults.withCredentials=true;
export default function ajax(url,data={},type='GET'){
    return new Promise((resolve,reject) => {
        let promise;
        //执行异步请求
        if(type === 'GET'){//发送GET请求
            promise = axios.get(url,{//配置对象
                params: data //指定请求参数
            })
        }else{//发送POST请求
            promise = axios.post(url,data)
        }
        //如果成功了, 调用resolve(value)
        promise.then(response => {
            console.log("请求成功！")
            console.log(response.data)
            resolve(response.data)
        }).catch(error =>  {//失败
            console.log('请求失败'+error.message)
            // message.error('请求出错了:'+error.message)
        })
    })
    
}