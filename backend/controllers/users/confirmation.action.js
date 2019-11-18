const date_fns = require('date-fns')
const { Confirmations, Users } = require('../../models')
const { sendConfirmationMail } = require('../../services/confirmations')

async function redirectUser(req, res) {
    try {
        const confirmation = await Confirmations.findOne({
            where: { code: req.params.verificationCode },
        })
        if (!confirmation)
            return res.status(403).send('Confirmation code is invalid.')
        if (date_fns.isFuture(confirmation.expirationDate)) {
            await Users.update(
                { verified: true },
                { where: { id: confirmation.UsersId } }
            )
            return res.redirect('/')
        } else
            return res
                .status(403)
                .send(
                    `The code has expired. Please generate another code in order to confirm your email at: ${process.env.URL}/api/users/regenerateCode/${confirmation.UsersId}`
                )
    } catch (err) {
        res.status(500).send(err)
    }
}

async function regenerateCode(req, res) {
    try {
        const user = await Users.findOne({ where: { id: req.params.UsersId } })
        await Confirmations.destroy({ where: { UsersId: req.params.UsersId } })
        await sendConfirmationMail(user)
        return res.status(200).send('Message sent')
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = { redirectUser, regenerateCode }
