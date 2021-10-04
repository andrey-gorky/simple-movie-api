const Movie =  require('../models/movies.model');
const { move } = require('../routes/index.route');

exports.createOne = async (req, res, next) => {
    try {
        // return res.status(200).json({"message": "Movie CREATED"});
        const MOVIE_MODEL = {
            title: req.body.Title,
            release: req.body.Release,
            format: req.body.Format,
        };
        Movie
            .create(MOVIE_MODEL)
            .then(movie => res.status(201).json(movie))
            .catch(error => res.status(400).json(error))
    } catch (error) {
        return res.status(404).json(error);
    }

    // try {
    //     // return res.status(200).json({"message": "Movie CREATED"});
    //     const MOVIE_MODEL = {
    //         title: req.body.Title,
    //         release: req.body.Release,
    //         format: req.body.Format,
    //     };

    //     try {
    //         const movie = await Movie.create(MOVIE_MODEL);
    //         console.log("Movie Created");
    //         return res.status(201).json(movie)
    //     } catch (error) {
    //         return res.status(500).json(error);
    //     }
    // } catch (error) {
    //     return res.status(500).json(error);
    // }
}

exports.deleteOne = (req, res, next) => {
    return Movie
        .destroy({ where: { id: req.params.id } })
        .then(() => res.status(204).json({message: "Movie deleted"}))
        .catch(error => res.status(500).json(error));
    
    // try {
    //     // return res.status(200).json({"message": "Movie DELETED"});
    //     const movie = await Movie.destroy({ where: { id: req.params.id } });
    //     return res.status(200).json(movie);
    // } catch (error) {
    //     return res.status(500).json(error);
    // }
}

exports.findOne = (req, res, next) => {
    return Movie
        .findByPk(req.params.id)
        .then(movie => res.status(200).send(movie))
        .catch(error => res.status(500).json(error));

    // try {
    //     // return res.status(200).json({"message": "SHOW Movie Info"});
    //     const movie = await Movie.findByPk(req.params.id);
    //     return res.status(200).json(movie);
    // } catch (error) {
    //     return res.status(500).json(error);
    // }
}

exports.findAll = async (req, res, next) => {
    return Movie
        .findAll({ order: [['title', 'ASC']] })
        .then(movies => res.status(200).json(movies))
        .catch(error => res.status(400).json(error));    
    
    // try {
    //     // return res.status(200).json({"message": "Movie List Sorted By Title in Alphabetic Order"});
    //     const movies = await Movie.findAll({ order: [['title', 'ASC']] });
    //     return res.status(200).json(movies);
    // } catch (error) {
    //     return res.status(500).json(error);
    // }
}

exports.findOneByTitle = (req, res, next) => {
    const title = req.params.title
    return Movie
        .findOne({ where: { title: title } })
        .then(movie => res.status(200).json(movie))
        .catch(error => res.status(400).json(error));
    
    
    // try {
    //     // return res.status(200).json({"message": "Movie Found By Title"});
    //     const title = req.params.title
    //     const movie = await Movie.findOne({ where: { title: title } });
    //     return res.status(200).json(movie);
    // } catch (error) {
    //     return res.status(400).json(error);
    // }
}

exports.findAllByActor = async (req, res, next) => {
    try {
        return res.status(200).json({"message": "Movie Found By Actor"});
    } catch (error) {
        return res.status(500).json(error);
    }
}