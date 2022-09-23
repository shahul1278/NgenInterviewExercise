const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const{getAllMovies, addMovie, getMovieById,updateMovie,deleteMovie}=require('../controllers/MovieController')

//Routes
router.route("/").get(getAllMovies).post(addMovie)
router.route("/:id").get(getMovieById).put(updateMovie).delete(deleteMovie);

module.exports = router;