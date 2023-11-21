const {Router} = require('express');
const temperamentRouter = Router()

const {getTemperamentHandler} = require('../handlers/temperamentHandler')

temperamentRouter.get ("/", getTemperamentHandler)


module.exports = temperamentRouter;