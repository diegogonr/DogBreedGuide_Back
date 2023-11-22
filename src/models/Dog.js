const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Dog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      get() {
        const value = this.getDataValue('id');
        return value != null ? String(value).padStart(4, '0') : null;
      },
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
