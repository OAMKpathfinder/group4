const { Pages } = require('@models')

async function getPageBySlug(req, res) {
    try {
        const row = await Pages.findOne({ where: { slug: req.params.slug } })
        res.status(200).send(row)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    '/:slug': {
        get: {
            action: getPageBySlug,
            level: 'public',
        },
    },
}
