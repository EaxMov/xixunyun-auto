const axios = require('axios')
const qs = require('qs')
let token = ''
const data = qs.stringify({
    account: process.env.ACCOUNT,
    password: process.env.PASSWORD,
    school_id: process.env.SCHOOL_ID,
    request_source: 3,
    system: '5.1.1',
})
const signdata = qs.stringify({
    address: process.env.ADDRESS,
    address_name: process.env.ADDRESS_NAME,
    latitude: process.env.LATITUDE,
    longitude:process.env.LONGITUDE,
    remark: 8,
    change_sign_resource: 0,
})
const headers = {
    'content-type': 'application/x-www-form-urlencoded',
}
const loginApi =
    'https://api.xixunyun.com/login/api?from=app&version=4.4.9&platform=android'

axios.post(loginApi, data, { headers }).then((res) => {
    if (res && res.data && res.data.data) {
        token = res.data.data.token
        console.log('登录成功>>>签到中')
        const signApi = `https://api.xixunyun.com/signin_rsa?token=${token}&from=app&version=4.4.9&platform=android&entrance_year=0&graduate_year=0&school_id=34`
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
