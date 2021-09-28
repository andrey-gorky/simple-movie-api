const User = require('../models/users.model');

exports.createOne = async (req, res, next) => {
    try {
        return res.status(200).json({"message": "The user has been created"});
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.login = async (req, res, next) => {
    try {
        return res.status(200).json({"message": "The user has been Logged In"});
    } catch (error) {
        return res.status(500).json(error);
    }
}
