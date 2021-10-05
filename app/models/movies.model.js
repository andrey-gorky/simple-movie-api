const Sequelize = require('sequelize');
const db = require('../util/database.util');

const Movie = db.define('movies', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    release: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    format: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Movie;
