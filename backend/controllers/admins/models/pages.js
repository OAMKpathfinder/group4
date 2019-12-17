const slugify = require('slugify')
const { Pages } = require('@models')
const { PagesValidate } = require('@validation')

async function getAllPages(req, res) {
    try {
        const rows = await Pages.findAll({
            order: [['createdAt', 'DESC']],
        })
        res.status(200).send(rows)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function getOne(req, res) {
    try {
        const row = await Pages.findByPk(req.params.id)
        res.status(200).send(row)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function createPage(req, res) {
    try {
        console.log(req.body)
        await Pages.create({
            title: req.body.title,
            slug: req.body.slug ? req.body.slug : slugify(req.body.title),
            excerpt: req.body.excerpt,
            image: req.body.image,
            body: req.body.body,
        })
        return res.status(200).send(req.body)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function updatePage(req, res) {
    try {
        const updated = await Pages.update(req.body, {
            where: { id: req.params.id },
            fields: Object.keys(req.body),
        })
        return res.status(200).send(updated)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function removePage(req, res) {
    try {
        await Pages.destroy({ where: { id: req.params.id } })
        res.status(200).send(true)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    '/': {
        get: {
            action: getAllPages,
            level: 'public',
        },
        post: {
            action: createPage,
            middlewares: PagesValidate,
            level: 'public',
        },
    },
    '/:id': {
        get: {
            action: getOne,
            level: 'public',
        },
        put: {
            action: updatePage,
            level: 'public',
        },
        delete: {
            action: removePage,
            level: 'public',
        },
    },
}
