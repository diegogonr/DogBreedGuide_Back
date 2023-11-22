const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
  sequelize.define('Dog', {
    id: {
      type: DataTypes.STRING,
      defaultValue: () => uuidv4().replace(/-/g, '').substring(0, 4), 
      primaryKey: true,
      allowNull: false,
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
