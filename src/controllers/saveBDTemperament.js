const axios = require('axios');
const {Temperament} = require('../db')

const getApiData = async ()=>{
    try {
        const allDogs =  (await axios.get('https://api.thedogapi.com/v1/breeds')).data
        const temperamentUnique = new Set()
        const temperaments  = []

        allDogs.forEach ((dog)=>
        {
            const temperamentArray = dog.temperament?.split(', ');
            if (temperamentArray) {
                temperamentUnique.add(...temperamentArray);
            }        
        })

        temperamentUnique.forEach(t =>{
            temperaments.push({name: t})
        })  
        return temperaments

    } catch (error) {
        console.error('Error al obtener datos de la API de perros:', error);

    }
}

const saveApiData = async ()=>{
    try {
        const response =  (await getApiData())
        await Temperament.bulkCreate(response) 
        console.log("Los temperamentos fueron cargados correctamente")
        return response


    } catch (error) {
        return {error: error.message}

    }
}

module.exports = {
    saveApiData
}