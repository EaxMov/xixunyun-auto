const axios = require('axios')
const qs = require('./utils/qs')
const sendEmail = require('./utils/email') //需要邮件通知请配置CODE和EMAIL，自己发给自己，并且下面注释打开
const data = qs.data
const signdata = qs.signdata
const headers = qs.headers
const loginApi = qs.loginApi

// 签到并提交每日体温报告
login().then((token) => {
  sign(token)
  studentReportInfo(token)
})

//登录
function login() {
  return new Promise((resolve, reject) => {
    axios.post(loginApi, data, { headers }).then((res) => {
      if (res && res.data && res.data.data) {
        resolve(res.data.data.token)
      } else {
        reject()
      }
    })
  })
}

//签到提交
function sign(token) {
  const signApi = qs.signApi(token)
  axios.post(signApi, signdata, { headers }).then((res) => {
    if (res && res.data) {
      console.log(res.data.code + ',' + res.data.message)
      wechetSend('习讯云签到提交', res.data.message)
    }
  })
}

//日报提交
function studentReportInfo(token) {
  const studentReportApi = qs.studentReportApi(token)
  const studentReportCommitApi = qs.studentReportCommitApi(token)
  axios.get(studentReportApi).then((res) => {
    if (res.data.code === 20000) {
      const { family_name, family_phone } = res.data.data.list[0]
      const reportForm = qs.reportdata(family_name, family_phone)
      axios.post(studentReportCommitApi, reportForm).then((res) => {
        console.log(res.data.code + ',' + res.data.message)
        wechatSend('习讯云日报提交', res.data.message)
      })
    }
  })
}

//推送微信通知
function wechatSend(type, msg) {
  const params = {
    token: qs.token,
    title: type,
    content: msg
  }
  axios.get('http://www.pushplus.plus/send', { params }).then((res) => {
    console.log(res)
    if (res && res.data && res.data.code === 200) {
      console.log(type + ',发送微信推送成功')
    }
  })
}
