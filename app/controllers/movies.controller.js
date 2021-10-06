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

exports.findOne = async (req, res, next) => {
    await Movie
        .findByPk(req.params.id)
        .then(movie => {
            if (movie) return res.status(200).send(movie);
            return res.status(404).json({message: "Movie not found"});
        });
}

exports.findAll = async (req, res, next) => {
    await Movie
        .findAll({ order: [['title', 'ASC']] })
        .then(movies => {
            if (movies) return res.status(200).send(movies);
            return res.status(404).json({message: "Movies not found"});
        });    
}

exports.findOneByTitle = async (req, res, next) => {
    const title = req.params.title
    await Movie
        .findAll({ where: { title: `${title}` } })
        .then(movie => {
            if (!movie) return res.status(404).json({message: "Movie with given title not found"});
            return res.status(200).send(movie);            
        })
        .catch(error => res.status(500).json(error));
}

exports.findAllByActor = async (req, res, next) => {
    const actor = req.params.actor
    await Movie
        .findAll({ where: { stars: { [Op.contains]: [ { "name": `${actor}` } ] } } })
        .then(movie => {
            if (!movie) return res.status(404).json({message: "Movie with given actor not found"});
            return res.status(200).send(movie);            
        })
        .catch(error => res.status(500).json(error));
}

exports.importFromFile = (req, res, next) => { 
    const file = req.file;

    if (!file) res.status(404).json({message: "Please upload a file"});
  
    const multerText = Buffer.from(file.buffer).toString('utf-8').split(/\r?\n/);
    const filteredMovies = multerText.filter(line => line !== "")
    let moviesArray = [];
    let movie = {}

    for (let line of filteredMovies) {
        if (movie.stars === undefined || movie.stars.length > 0) {
            movie = {
                title: "",
                release: 0,
                format: "",
                stars: []
            }
        }
        if (line.startsWith("Title: ")) {
            movie.title = line.split("Title: ")[1]
        } else if (line.startsWith("Release Year: ")) {
            movie.release = parseInt(line.split("Release Year: ")[1], 10)
        } else if (line.startsWith("Format: ")) {
            movie.format = line.split("Format: ")[1]
        } else if (line.startsWith("Stars: ")) {
            movie.stars = line.split("Stars: ")[1].split(', ');
            movie.stars = movie.stars.map(star => ({name: star}))
            moviesArray.push(movie)
        }
    }
    Promise.all(moviesArray.map((movie) => Movie.create(movie)))
    return res.status(200).send(moviesArray);
}
