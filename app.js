const axios = require('axios')
const qs = require('./utils/qs')
const sendEmail = require('./utils/email')
const data = qs.data
const signdata = qs.signdata
const headers = qs.headers
const loginApi = qs.loginApi

login().then(token => {
    sign(token)
})

function login(){
    return new Promise((resolve,reject) => {
        axios.post(loginApi, data, { headers }).then((res) => {
            if (res && res.data && res.data.data) {
                resolve(res.data.data.token)
            }else{
                reject()
            }
        })
    })
}
function sign(token){
    const signApi = qs.signApi(token)
    axios.post(signApi, signdata, { headers }).then((res) => {
        if (res && res.data) {
            console.log(res.data.code + ','+ res.data.message)
            if (res.data.code === 20000) {
                // sendEmail('成功',res.data.message)
                wechetSend('成功',res.data.message)
                return
            }
            if (res.data.code === 64032) {
                // sendEmail('重复',res.data.message)
                wechetSend('重复',res.data.message)
                return
            }
            // sendEmail('失败',res.data.message)
            wechetSend('失败',res.data.message)
        }
    })
}

function wechetSend(type,msg){
    const params = {
        token: qs.token,
        title: '习讯云签到' + type,
        content: msg
    }
    axios.get('http://pushplus.hxtrip.com/send',{ params }).then(res => {
        if(res && res.data && res.data.code === 200){
            console.log("发送微信推送成功");
        }
    })
}