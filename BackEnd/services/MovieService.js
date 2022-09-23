const movies = require('../Model/movies')
 
exports.getAllMovies = async () => {
  return await movies.find();
};
 
exports.addMovie = async (data) => {
  return await movies.create(data);
};
exports.getMovieById = async (id) => {
  return await movies.findById(id);
};
 
exports.updateMovie = async (id, data) => {
  return await movies.findByIdAndUpdate(id, data);
};
 
exports.deleteMovie = async (id) => {
  return await movies.findByIdAndDelete(id);
};
