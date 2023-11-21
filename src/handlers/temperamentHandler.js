
const {getAllTemperament} =require('../controllers/temperamentControllers')

const getTemperamentHandler = async (req, res) => {
    try {
        const response = (await getAllTemperament())
        if (response.error) throw Error (response.error)

        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});

    }


}


module.exports = {
    getTemperamentHandler
}