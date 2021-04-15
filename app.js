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
function sign(){
    const signApi = qs.signApi(token)
    axios.post(signApi, signdata, { headers }).then((res2) => {
        if (res2 && res2.data) {
            console.log(res2.data.code + ','+ res2.data.message)
            if (res2.data.code === 20000) {
                sendEmail('success',res2.data.message)
                return
            }
            if (res2.data.code === 64032) {
                sendEmail('repeat',res2.data.message)
                return
            }
            sendEmail('faild',res2.data.message)
        }
    })
}