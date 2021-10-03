exports.healthCheck = async (req, res, next) => res.status(200).json({ status: 1 });
