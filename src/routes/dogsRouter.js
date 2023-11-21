const {Router} = require('express');
const dogsRouter = Router()

const {getDogsHandler, getDetailsDogsHandler, createDogsHandler} = require('../handlers/dogHandler')

dogsRouter.get ("/", getDogsHandler)
dogsRouter.get ("/:idRaza", getDetailsDogsHandler)
dogsRouter.post ("/", createDogsHandler)

module.exports = dogsRouter;