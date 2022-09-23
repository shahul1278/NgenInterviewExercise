const movieService = require("../services/MovieService");
 
exports.getAllMovies = async (req, res) => {
  try {
    const MovieLists = await movieService.getAllMovies();
    res.json({ data: MovieLists, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addMovie= async (req, res) => {
    try {
        console.log(req.body.Moviedata)
      const addedmovie = await movieService.addMovie(req.body.Moviedata);
      res.json({ data: addedmovie, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


  exports.getMovieById = async (req, res) => {
    try {
      const Movie = await movieService.getMovieById(req.params.id);
      res.json({ data: Movie, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.updateMovie = async (req, res) => {
    try {
      const UpdatedMovie = await movieService.updateMovie(req.params.id, req.body.Moviedata);
      res.json({ data: UpdatedMovie, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
   
  exports.deleteMovie = async (req, res) => {
    try {
      const DeletedMovie = await movieService.deleteMovie(req.params.id);
      res.json({ data: DeletedMovie, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  