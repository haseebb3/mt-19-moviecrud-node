const express = require("express");
const router = express.Router();
const {
    getAllMovies,
    getSingleMovies,
    addMovie,
    updateMovie,
    deleteMovie
} = require("../controller/moviesController");


router.get("/", getAllMovies);
router.get("/:id", getSingleMovies);
router.post("/", addMovie);
router.patch("/:id", updateMovie);
router.delete("/:id", deleteMovie);

module.exports = router