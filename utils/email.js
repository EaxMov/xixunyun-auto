const nodemailer = require("nodemailer");
const mail = process.env.EMAIL
const code = process.env.CODE
let tansporter = nodemailer.createTransport({
    service:'qq',
    secure:true,
    auth:{
        user:mail,
        pass:code
    }
})
let mailOptions = {
    from:mail,
    to:mail,
    subject:'习讯云签到',
    text:'签到'
}
const send = {
    success:() => {
        mailOptions.subject += '成功'
        mailOptions.text += '成功'
    },
    faild:() => {
        mailOptions.subject += '失败'
        mailOptions.text += '失败'
    },
    repeat:() => {
        mailOptions.subject += '重复'
        mailOptions.text += '重复'
    }
}
function sendEmail(type){
    send[type]
    tansporter.sendMail(mailOptions,(err,data) => {
        if(err){
            console.log("发送邮件失败");
        }else{
            console.log("发送邮件成功");
        }
    })
}

module.exports = sendEmail