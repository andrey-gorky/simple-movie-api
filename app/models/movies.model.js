const { DataTypes } = require('sequelize');
const db = require('../util/database.util');

const Movie = db.define('movies', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    release: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    format: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stars: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Movie;
