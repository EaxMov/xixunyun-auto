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
                sendEmail('success',res.data.message)
                return
            }
            if (res.data.code === 64032) {
                sendEmail('repeat',res.data.message)
                return
            }
            sendEmail('faild',res.data.message)
        }
    })
}