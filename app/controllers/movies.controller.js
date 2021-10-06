const Movie =  require('../models/movies.model');
const { Op } = require('sequelize');
const multer = require('multer');
const readline = require('readline');
const fs = require('fs');

exports.createOne = async (req, res, next) => {
    try {
        const [ ...actors ] = req.body.Stars        
        let stars = new Array();
        actors.map((el) => stars.push({"name": el }));
        const MOVIE_MODEL = {
            title: req.body.Title,
            release: req.body.Release,
            format: req.body.Format,
            stars: stars
        };
        await Movie
            .create(MOVIE_MODEL)
            .then(movie => res.status(201).json(movie))
            .catch(error => res.status(400).json(error))
    } catch (error) {
        return res.status(404).json(error);
    }
}

exports.deleteOne = (req, res, next) => {
    return Movie
        .destroy({ where: { id: req.params.id } })
        .then(() => res.status(204).json({message: "Movie deleted"}))
        .catch(error => res.status(500).json(error));
}

exports.findOne = (req, res, next) => {
    return Movie
        .findByPk(req.params.id)
        .then(movie => {
            if (movie) return res.status(200).send(movie);
            return res.status(404).json({message: "Movie not found"});
        });
}

exports.findAll = async (req, res, next) => {
    return Movie
        .findAll({ order: [['title', 'ASC']] })
        .then(movies => {
            if (movies) return res.status(200).send(movies);
            return res.status(404).json({message: "Movies not found"});
        });    
}

exports.findOneByTitle = (req, res, next) => {
    const title = req.params.title
    return Movie
        .findAll({ where: { title: `${title}` } })
        .then(movie => {
            if (movie) return res.status(200).send(movie);
            return res.status(404).json({message: "Movie with given title not found"});
        })
        .catch(error => res.status(500).json(error));
}

exports.findAllByActor = async (req, res, next) => {
    const actor = req.params.actor
    return Movie
        .findAll({ where: { stars: { [Op.contains]: [ { "name": `${actor}` } ] } } })
        .then(movie => {
            if (movie) return res.status(200).send(movie);
            return res.status(404).json({message: "Movie with given actor not found"});
        })
        .catch(error => res.status(500).json(error));
}

exports.importFromFile = (req, res, next) => { 
    const file = req.file;

    if (!file) res.status(404).json({message: "Please upload a file"});
  
    const multerText = Buffer.from(file.buffer).toString('utf-8').split(/\r?\n/);

    let moviesArray = [];
    let movie = {}
    
    multerText.some((line) => {
        line.startsWith("Title: ") ? movie.title = line.split("Title: ")[1] :
        line.startsWith("Release Year: ") ? movie.release = parseInt(line.split("Release Year: ")[1], 10) :
        line.startsWith("Format: ") ? movie.format = line.split("Format: ")[1] :
        line.startsWith("Stars: ") ? movie.stars = line.split("Stars: ")[1].split(', ') :
        moviesArray.push(movie)
    });

    const pushMoviesArray = async (moviesArray) => {
        await Promise.all(moviesArray.map((movie) => Movie.create(movie)))
    }
    pushMoviesArray(moviesArray);
  
    return res.status(200).send(moviesArray);
}
