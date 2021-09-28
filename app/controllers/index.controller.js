const healthCheck = async (req, res, next) => {
    return res.status(200).json({ "status": 1 });
}

module.exports = healthCheck;