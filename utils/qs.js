const qs = require('qs')
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
const loginApi = 'https://api.xixunyun.com/login/api?from=app&version=4.4.9&platform=android'
const signApi = (token) => {
    return `https://api.xixunyun.com/signin_rsa?token=${token}&from=app&version=4.4.9&platform=android&entrance_year=0&graduate_year=0&school_id=${process.env.SCHOOL_ID}`
}

module.exports = {
    data,
    signdata,
    loginApi,
    signApi,
    headers
}