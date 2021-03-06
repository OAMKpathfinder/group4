const { Users, Houses } = require('@models')
const { adminsValidate } = require('@validation')
const bcrypt = require('bcrypt')
const client = require('@services/mail')

function sendConfirmationMail(email) {
    const mail = {
        from: '"Arpi" <k9stgl00@students.oamk.fi>',
        to: email,
        subject: 'Confirmation email',
        html: '<b>Hello world</b>',
    }

    client.sendMail(mail, function(err) {
        if (err) {
            console.error
        } else {
            console.log('Message sent to: ' + email)
        }
    })
}

async function get(req, res) {
    try {
        const rows = await Users.findAll()
        res.status(200).send(rows)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function getOne(req, res) {
    try {
        const rows = await Users.findByPk(req.params.id, {
            include: [
                {
                    model: Houses,
                    as: 'Houses',
                },
            ],
        })
        res.status(200).send(rows)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function create(req, res) {
    try {
        const username = await Users.findOne({
            where: { username: req.body.username },
        })
        const email = await Users.findOne({ where: { email: req.body.email } })
        if (username) return res.status(409).send('Username already taken')
        if (email) return res.status(409).send('E-mail already taken')
    } catch (err) {
        return res.status(500).send(err)
    }
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
            return res.status(500).send(err)
        }
        try {
            const user = await Users.create({
                full_name: req.body.full_name,
                username: req.body.username,
                email: req.body.email,
                password: hash,
                role: req.body.role,
                verified: true,
            })

            res.status(200).send({
                id: user.id,
                full_name: user.full_name,
                username: user.username,
                email: user.email,
                role: user.role,
                verified: user.verified,
            })

            sendConfirmationMail(req.body.email)
            return
        } catch (err) {
            return res.status(500).send(err)
        }
    })
}

async function update(req, res) {
    try {
        const updated = await Users.update(req.body, {
            where: { id: req.params.id },
            fields: Object.keys(req.body),
        })
        return res.status(200).send(updated)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function remove(req, res) {
    try {
        await Users.destroy({ where: { id: req.params.id } })
        res.status(200).send(true)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports = {
    '/': {
        get: {
            action: get,
            level: 'admin',
        },
        post: {
            action: create,
            middlewares: adminsValidate,
            level: 'admin',
        },
    },
    '/:id': {
        get: {
            action: getOne,
            level: 'admin',
        },
        put: {
            action: update,
            level: 'admin',
        },
        delete: {
            action: remove,
            level: 'admin',
        },
    },
}
