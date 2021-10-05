const Movie =  require('../models/movies.model');
const Star =  require('../models/stars.model');

Movie.belongsToMany(Star, {as: "Movie", foreignKey: "MovieId", through: "Movies_Actors" });
Star.belongsToMany(Movie, {as: "Star", foreignKey: "StarId", through: "Movies_Actors" });