const axios = require('axios')
const qs = require('./utils/qs')
const sendEmail = require('./utils/email')
const data = qs.data
const signdata = qs.signdata
const headers = qs.headers
const loginApi = qs.loginApi


axios.post(loginApi, data, { headers }).then((res) => {
    if (res && res.data && res.data.data) {
        console.log('登录成功>>>签到中')
        const signApi = qs.signApi(res.data.data.token)
        axios.post(signApi, signdata, { headers }).then((res2) => {
            if (res2 && res2.data) {
                if (res2.data.code === 20000) {
                    console.log(res2.data.code + ','+ res2.data.message)
                    sendEmail('success',res2.data.message)
                    return
                }
                if (res2.data.code === 64032) {
                    console.log(res2.data.code + ','+ res2.data.message)
                    sendEmail('repeat',res2.data.message)
                    return
                }
                console.log(res2.data.code + ','+ res2.data.message)
                sendEmail('faild',res2.data.message)
            }
        })
    }else{
        console.log("执行失败");
    }
})
