
const {getDogByName, getAllDogs,createDog, getDogById} =require('../controllers/dogControllers')

const getDogsHandler = async (req, res) => {
    const {name} = req.query
    try {
        if (name)
        {
            const response = (await getDogByName(name))
            if (response.error) throw Error (response.error)

            if(response.length>0)  res.status(200).json(response) 
            else throw new Error(`No existe el Perro con name: ${name}`)

        }
        else {
            const response = (await getAllDogs())
            if (response.error) throw Error (response.error)
            res.status(200).json(response);
        }

    } catch (error) {
        res.status(400).json({error: error.message});
    }
}


const getDetailsDogsHandler = async (req, res) => {
    const {idRaza} = req.params;
    console.log(idRaza)
    try {
        const response = (await getDogById(idRaza))
        if (response.error) throw Error (response.error)

        if(response.length>0)  res.status(200).json(response) 
        else throw new Error(`No existe el Perro con idRaza: ${idRaza}`)

    } catch (error) {
        res.status(400).json({error: error.message});

    }

}


const createDogsHandler = async (req, res) => {
    const {temperament, ...dog} = req.body
    try {
        const response = await createDog(dog, temperament)
        if (response.error) throw Error (response.error)
        res.status(200).send("Dog created successfully");

    } catch (error) {
        res.status(400).json({error: error.message});

    }

}

module.exports = {
    getDogsHandler, 
    getDetailsDogsHandler,
    createDogsHandler
}