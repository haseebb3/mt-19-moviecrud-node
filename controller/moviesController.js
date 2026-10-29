const movies = require("../data");

const getAllMovies = (req, res) => {
    try {
        res.status(200).json({
            ok: true,
            message: `Moveis data fetched successfully...`,
            data: movies
        })
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: `Error while fetching movies`,
            error: err
        })
    }
}


const getSingleMovies = (req, res) => {
    const movieId = req.params.id;
    try {
        const movie = movies.find(m => m.id === movieId);
        if (!movie) {
            res.status(404).json({
                ok: false,
                message: `MOive with id ${movieId} doesnt exist`
            })
        }
        res.status(200).json({
            ok: true,
            message: `Movei with id ${movieId} is fetched successfully...`,
            data: movie
        })
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: `Error while fetching movie with id ${movieId}`,
            error: err.message
        })
    }
}

//create
const addMovie = (req, res) => {
    try {
        const { title, imageUrl, rating, description } = req.body;
        if (!title || !imageUrl) {
            return res.status(400).json({
                ok: false,
                message: `Title and imagesUrl are requreid fields`
            })
        }
        const newMovie = {
            id: Date.now().toString(),
            title: title,
            imageUrl: imageUrl,
            rating: rating,
            description: description,
            updatedAt: null,
            createdAt: Date.now()
        }

        movies.push(newMovie);
        res.status(200).json({
            ok: true,
            message: `movie with id ${newMovie.id} is added successfully...`,
            data: newMovie
        })
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: `Error while adding new movie`,
            error: err
        })
    }
}


//update
const updateMovie = (req, res) => {
    const updateId = req.params.id;
    try {
        const existingObj = movies.find(m => m.id === updateId);
        const updateIndex = movies.findIndex(m => m.id === updateId);
        const { title, imageUrl, rating, description } = req.body;

        if (!title || !imageUrl) {
            return res.status(400).json({
                ok: false,
                message: `Title and imagesUrl are requreid fields`
            })
        }

        const updatedObj = {
            ...existingObj,
            title: title,
            imageUrl: imageUrl,
            rating: rating,
            description: description,
            updatedAt: Date.now()
        }
        movies[updateIndex] = updatedObj;

        res.status(200).json({
            ok : true,
            message : `Movie with id ${updateId} is updated successfully...`,
            data : updatedObj
        })

    } catch (err) {
        res.status(500).json({
            ok: false,
            message: `Error while updating movie`,
            error: err
        })
    }
}

//delete
const deleteMovie = (req,res) => {
    const deleteId = req.params.id;
    try{
        const deleteIndex = movies.findIndex(m => m.id === deleteId);
        if(deleteIndex === -1){
             return res.status(404).json({
                ok: false,
                message: `Movie with id ${deleteId} doesnt exist...`
            })
        }

        movies.splice(deleteIndex,1);
        res.status(200).json({
            ok : true,
            message : `Movie with id ${deleteId} is deleted successfully...`,
            data : movies[deleteIndex]
        })
    }
    catch(err){
         res.status(500).json({
            ok: false,
            message: `Error while deleting movie`,
            error: err
        })
    }
}

module.exports = {
    getAllMovies,
    getSingleMovies,
    addMovie,
    updateMovie,
    deleteMovie
}