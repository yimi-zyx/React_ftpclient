/*
包含应用中的所有接口函数的模块
每个函数的返回值都是promise
 */
import ajax from './ajax';
import jsonp from 'jsonp';
import { message} from 'antd'
//登录接口请求模块
const base = 'http://localhost:5000'
export const reqLogin = (username,password,captcha) => ajax(base+'/login',{username,password,captcha},'GET');
// 注册接口请求模块
export const reqRegister = (username,password,email,phone,captcha) => ajax(base+'/register',{username,password,email,phone,captcha},'GET');
// 忘记密码查找用户接口请求模块
export const reqGetuser = (account,captcha) => ajax(base+'/getuser',{account,captcha},'GET');
// 忘记密码设置新密码接口请求模块
export const reqSetpwd = (userid,password) => ajax(base+'/setpwd',{userid,password},'POST');
 
/*
json请求的接口请求函数e
 */
export const reqWeather = (city) => {

    return new Promise((resolve, reject) => {
      const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
      // 发送jsonp请求
      jsonp(url, {}, (err, data) => {
       // console.log('jsonp()', err, data)
        // 如果成功了
        if (!err && data.status==='success') {
          // 取出需要的数据
          const {dayPictureUrl, weather} = data.results[0].weather_data[0]
          console.log('获取成功')
          resolve({dayPictureUrl, weather})
        } else {
          // 如果失败了
          message.error('获取天气信息失败!')
        }
  
      })
    })
  }