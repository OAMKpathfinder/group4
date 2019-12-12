const db = require('@models')

// allowNull -> required
// special -> Select
// type
//     integer -> Number
//     DOUBLE PRECISION -> Number
//     Character Varying(255)->String
//     Text-> text
//     TIMESTAMP WITH TIME ZONE -> Date
// comment ->delete
// primaryKey -> delete
// defaultValue -> delete

function parseTable(table) {
    let parsedTable = {}
    const columnNames = Object.keys(table)
    const regex = /(\([0-9]*\))/
    function getType(type) {
        if (type === 'INTEGER' || type === 'DOUBLE PRECISION') return 'number'
        else if (type.includes('CHARACTER VARYING')) return 'text'
        else if (type === 'TIMESTAMP WITH TIME ZONE') return 'date'
        else if (type === 'USER-DEFINED') return 'select'
        else return type.toLowerCase()
    }

    columnNames.forEach(column => {
        parsedTable[column] = {
            type: getType(table[column].type),
            required: table[column].allowNull,
        }
        table[column].special.length > 0
            ? (parsedTable[column].options = table[column].special)
            : null
        table[column].type.includes('CHARACTER VARYING')
            ? (parsedTable[column].maxLength = parseInt(
                  table[column].type.match(regex)[0].slice(1, -1)
              ))
            : null
    })
    return parsedTable
}

async function getModels(req, res) {
    try {
        let describeModel = []
        delete db['Sequelize']
        delete db['sequelize']

        const modelNames = Object.keys(db)
        for (const model of modelNames) {
            const d = await db[model].describe()
            const parsed = parseTable(d)
            describeModel.push({
                name: model,
                attributes: parsed,
            })
        }
        res.status(200).send(describeModel)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function getAttributes(req, res) {
    try {
        res.status(200).json(await db.Users.describe())
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

module.exports = {
    getAttributes,
    getModels,
}
