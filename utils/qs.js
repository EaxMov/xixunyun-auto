const qs = require("qs")
const data = qs.stringify({
    account: process.env.ACCOUNT,
    password: process.env.PASSWORD,
    school_id: process.env.SCHOOL_ID,
    request_source: 3,
    system: "5.1.1",
})
const signdata = qs.stringify({
    address: process.env.ADDRESS,
    address_name: process.env.ADDRESS_NAME,
    latitude: process.env.LATITUDE,
    longitude: process.env.LONGITUDE,
    remark: 0,
    change_sign_resource: 0,
})

const reportdata = (family_name, family_phone) => {
    return qs.stringify({
        health_type: 1,
        province_id: 0,
        city_id: 0,
        district_id: 0,
        hubei: 0,
        ill: 0,
        state: 1,
        family_name,
        family_phone,
        temperature: (36 + Math.random()).toFixed(1),
        safe: [],
        file: "",
    })
}

const headers = {
    "content-type": "application/x-www-form-urlencoded",
}
const loginApi = "https://api.xixunyun.com/login/api?from=app&version=4.4.9&platform=android"
const signApi = (token) => {
    return `https://api.xixunyun.com/signin_rsa?token=${token}&from=app&version=4.4.9&platform=android&entrance_year=0&graduate_year=0&school_id=${process.env.SCHOOL_ID}`
}
const studentReportApi = (token) => {
    return `https://api.xixunyun.com/health/studentlist?token=${token}&page_no=1&page_size=1`
}
const studentReportCommitApi = (token) => {
    return `https://api.xixunyun.com/health/add?token=${token}`
}
const mail = process.env.MAIL
const code = process.env.CODE
const token = process.env.TOKEN
module.exports = {
    data,
    signdata,
    reportdata,
    loginApi,
    signApi,
    studentReportApi,
    studentReportCommitApi,
    headers,
    mail,
    code,
    token,
}
