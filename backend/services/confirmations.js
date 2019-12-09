require('module-alias/register')
const client = require('@services/mail')
const date_fns = require('date-fns')
const uuid = require('uuid/v4')
const { Confirmations } = require('@models')
const ejs = require('ejs')
const fs = require('fs')

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
        const link = `http://${process.env.URL}/api/users/confirm/${verificationCode}`
        const file = fs.readFileSync(
            __dirname + '/mailTemplates/confirmation.ejs',
            'utf8'
        )
        const html = await ejs.render(file, {
            full_name: user.full_name,
            link: link,
        })
        const mail = {
            from: '"Arpi" <k9stgl00@students.oamk.fi>',
            to: user.email,
            subject: 'Confirmation email',
            html: html,
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
