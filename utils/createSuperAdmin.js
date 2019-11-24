const keys = require('../config/keys');
const mailer = require('@sendgrid/mail');
mailer.setApiKey(keys.sendGridKey);


const User = require('../models/User');

const createSuperAdmin = () => {
    const password = _generatePassword();
    const name = keys.name;
    const email = keys.email;
    const is_admin = 1;

    User.findOne({email}).where('is_delete').equals(0)
    .then(user => {
        if(!user){
            const newUser = new User({
                name,
                email,
                password,
                is_admin
            })
            newUser.save()
            .then(registered => {
                if(registered){
                    _sendEmail(registered)
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
                } 
            })
            .catch(err => console.log(err))
        }
        console.log("User email already exist")
    })
    .catch(err => condsole.log(err))

}

const _generatePassword = () => {
    return Array(30).fill('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz').map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('');
}

const _sendEmail = payload => {
    const data = {
        from: 'Payroll Admin <no-reply@payroll.admin>',
        to: payload.email,
        subject: 'Super Admin Details',
        text: `Hello, Here are your login details\nEmail: ${payload.email}\nPassword: ${payload.password}`
    }
    return mailer.send(data);
}

module.exports = Object.assign({}, {createSuperAdmin});