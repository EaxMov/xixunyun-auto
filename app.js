const axios = require('axios')
const qs = require('./utils/qs')
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
                    console.log('签到成功')
                    return
                }
                if (res2.data.code === 64032) {
                    console.log('重复签到')
                    return
                }
                console.log('未知错误')
            }
        })
    }else{
        console.log("执行失败");
    }
})
