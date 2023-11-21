const {Temperament} = require('../db')

const getAllTemperament = async () => {
    try {
        const response = await Temperament.findAll()
        return response

    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getAllTemperament
}