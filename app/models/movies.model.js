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
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                args: true,
                msg: `Please add Movie title`,
            }
        }
    },
    release: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: `Please add release year`,
            },
            isInt: {
                args: true,
                msg: `Please add integer number for the release year`,
            },
            max: {
                args: 2021, 
                msg: `Please input release year between 1850 and 2021 years`
            },
            min: {
                args: 1850, 
                msg: `Please input release year between 1850 and 2021 years`
            },
        }
    },
    format: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['VHS', 'DVD', 'Blu-Ray']], 
                msg: `Please input relevant movie format, pick one of these: 'VHS', 'DVD', 'Blu-Ray'`,
            },
        }
    },
    stars: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: `Please add Movie actors`,
            }
        }
    }
}, {
    timestamps: true
});

module.exports = Movie;
