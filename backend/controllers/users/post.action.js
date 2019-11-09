const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Users } = require('../../models');

async function signUp(req, res) {
    try{
        const username = await Users.findOne({where: {username: req.body.username}});
        const email = await Users.findOne({where: {email: req.body.email}});
        if (username) return res.status(409).send('Username already taken');
        if (email) return res.status(409).send('E-mail already taken');
    } catch (err) {
        return res.status(500).send(err);
    };
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
            return res.status(500).send(err);
        }
        try {
            const user = await Users.create({
                full_name: req.body.full_name,
                username: req.body.username,
                email: req.body.email,
                password: hash,
            });
            return res.status(200).send(user);
        } catch (err) {
            return res.status(500).send(err);
        }
    })
}

async function login(req, res){
    if (!req.body.username) return res.status(400).send('Username required');
    if (!req.body.password) return res.status(400).send('Password required');
    try{
        const user = Users.findOne({where: {username: req.body.Users}});
        if (!user)
            return res.status(404).send('Username or Password is invalid.');
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) return res.status(401).send('Username or Password is invalid.');
                if (result) {
                    const token = jwt.sign(
                        {
                            username: user.username,
                            userId: user._id,
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: '7d',
                        }
                    );
                    return res.status(200).send(token);
                } else
                    return res
                        .status(401)
                        .send('Username or Password is invalid.');
            });
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
}

module.exports = {
    signUp, login
};