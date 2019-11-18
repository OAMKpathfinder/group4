const client = require('../services/mail')
const date_fns = require('date-fns')
const uuid = require('uuid/v4')
const { Confirmations } = require('../models')

async function generateVerificationCode(UsersId) {
    try {
        const date = date_fns.addDays(new Date(), 1)
        const code = uuid()
        const confirmation = await Confirmations.build({
            code: code,
            expirationDate: date,
        })
        confirmation.setUsers(UsersId)
        await confirmation.save()
        return code
    } catch (err) {
        return err
    }
}

async function sendConfirmationMail(user) {
    try {
        const verificationCode = await generateVerificationCode(user.id)
        const mail = {
            from: '"Arpi" <k9stgl00@students.oamk.fi>',
            to: user.email,
            subject: 'Confirmation email',
            html: `Please confirm your email at ${process.env.URL}/api/users/confirm/${verificationCode}`,
        }

        client.sendMail(mail, function(err) {
            if (err) {
                console.error
            } else {
                console.log('Message sent to: ' + user.email)
            }
        })
    } catch (err) {
        return err
    }
}

module.exports = { sendConfirmationMail }
