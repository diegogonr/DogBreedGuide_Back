
const axios = require("axios")
const {Dog, Temperament, DogTemperament} = require("../db")
const { Op } = require('sequelize');

const getDogByName = async (name) => {
    try {
        //*API
        let response = (await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)).data

        const DogsApi=response.map (dog => {
            return ({
                id: dog.id,
                img: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
                name: dog.name,
                height: dog.height.metric,
                weight: dog.weight.metric,
                age: dog.life_span,
                temperaments: dog.temperament,
                source: 'API'

            })
        })

        //*BDD
        const DogsDB = await Dog.findAll({
            where: {
                name: {
                    [Op.iLike]: name 
                  }              
            }
        })

        const DogsFromDB = DogsDB.map(dog => ({
            id: dog.id,
            img: dog.img,
            name: dog.name,
            height: dog.height,
            weight: dog.weight,
            age: dog.age,
            temperaments: dog.Temperaments.map(temperament => ({
                name: temperament.name
            })),
            source: 'DB'
        }));


        return[...DogsApi, ...DogsFromDB];

    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getDogById = async (id) => {
    try {
        let allDogs = await getAllDogs()
        
        response = allDogs.filter ((dog) => 
            dog.id == id
        )
        console.log(response)
        return response;

    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getAllDogs = async () => {
    try {
        const response = (await axios.get(`https://api.thedogapi.com/v1/breeds`)).data
        const DogsApi=response.map (dog => {
            return ({
                id: dog.id,
                img: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
                name: dog.name,
                height: dog.height.metric,
                weight: dog.weight.metric,
                age: dog.life_span,
                temperaments: dog.temperament,
                source: 'API'
            })
        })

        console.log(DogsApi)
        const dogDB = await Dog.findAll({
            include: [{
                model: Temperament,
                attributes: ['name'],
            }]
        });
        console.log(dogDB)

        const dogsWithTemperaments = dogDB.map(dog => {
            return {
                id: dog.id,
                img: dog.img,
                name: dog.name,
                height: dog.height,
                weight: dog.weight,
                age: dog.age,
                temperaments: dog.Temperaments.map(temperament => ({
                    name: temperament.name
                })),
                source: 'DB'
            };
        });

        return [...DogsApi, ...dogsWithTemperaments]

    } catch (error) {
        res.status(400).json({error: error.message});
    }
}


const createDog= async (dog, temperament) => {
    console.log(dog)
    console.log(temperament)
    try {
        const newDog= await Dog.create(dog) 

        const TemperamentsDB = await Temperament.findAll({
            where: {
              name: {
                [Op.iLike]: {
                    [Op.any]: temperament, 
                  },
              },
            },
          });
      
          console.log(TemperamentsDB);

        await newDog.addTemperaments(TemperamentsDB.map((temp) => temp.id));

        return dog;


    } catch (error) {
        return {error: error.message}
    }
}



module.exports = {
    getDogByName,
    getAllDogs,
    createDog,
    getDogById
}