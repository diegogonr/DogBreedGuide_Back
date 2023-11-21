const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id:{
      type: DataTypes.UUID,                  //tipo de dato codigo alfanumerico
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4         //algoritmo para crear el codigo
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true                    
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    age: {
      type: DataTypes.STRING,
      allowNull: false,
    },


  });
};