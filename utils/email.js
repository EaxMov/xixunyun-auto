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
    success:(msg) => {
        mailOptions.subject += '成功'
        mailOptions.text = msg
    },
    faild:(msg) => {
        mailOptions.subject += '失败'
        mailOptions.text = msg
    },
    repeat:(msg) => {
        mailOptions.subject += '重复'
        mailOptions.text = msg
    }
}
function sendEmail(type,msg){
    send[type](msg)
    tansporter.sendMail(mailOptions,(err,data) => {
        if(err){
            console.log("发送邮件失败");
        }else{
            console.log("发送邮件成功");
        }
    })
}

module.exports = sendEmail