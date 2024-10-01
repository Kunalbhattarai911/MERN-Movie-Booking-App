import Movie from "../models/Movie.model.js";

//add movie by admin
export const addMovies = async (req, res) => {
  try {
    const { title, description, releaseDate, posterUrl, featured, totalSeats } =req.body;
    const adminId = req.id;

    const newMovie = await Movie.create({
      adminId,
      title,
      description,
      releaseDate,
      posterUrl,
      featured,
      totalSeats
    });

    return res.status(201).json({
      message: "Movie added successfully",
      success: true,
      newMovie,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while adding the movie",
      error: error.message,
      success: false,
    });
  }
};

//get admin movies
export const getMovie = async (req, res) => {
    try {
      const adminId = req.id; // Extracting the adminId from the request (set in isAdminAuthenticated)
      
      // Fetch the movies where the adminId matches the admin
      const movies = await Movie.find({ adminId });
  
      if (!movies || movies.length === 0) {
        return res.status(404).json({
          message: "Movies not found",
          success: false,
        });
      }
  
      return res.status(200).json({
        message: "List of movies",
        success: true,
        movies,
      });
    } catch (error) {
      return res.status(500).json({
        message: "An error occurred while retrieving the movies",
        error: error.message,
        success: false,
      });
    }
  };

//get admin movie by id
export const getMovieById = async (req, res) => {
  try {
    const adminId = req.id;

    const { id } = req.params;

    const singleMovie = await Movie.find({ adminId, _id: id });
    if (!singleMovie) {
      return res.status(404).json({
        message: "Movie Not Found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Movie Information",
      success: true,
      singleMovie,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while Retriving the Movie",
      error: error.message,
      success: false,
    });
  }
};

//get all movies
export const getAllMovies = async (req, res) => {
  try {
    const getMovies = await Movie.find();
    return res.status(200).json({
      message: "Successfully Retrived All The movies",
      success: true,
      getMovies,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while Retriving the Movie",
      error: error.message,
      success: false,
    });
  }
};

//update movie by admin

export const updateMovie = async (req, res) => {
  try {
    const adminId = req.id;
    const { id } = req.params;
    const { title, description, releaseDate, posterUrl, featured, bookings, totalSeats } = req.body;

    let findMovie = await Movie.findOne({ adminId, _id: id });
    if (!findMovie) {
      return res.status(404).json({
        message: "Movie Not Found",
        success: false,
      });
    }

    if (title) findMovie.title = title;
    if (description) findMovie.description = description;
    if (releaseDate) findMovie.releaseDate = releaseDate;
    if (posterUrl) findMovie.posterUrl = posterUrl;
    if (featured) findMovie.featured = featured;
    if (bookings) findMovie.bookings = bookings;
    if (totalSeats) findMovie.totalSeats = totalSeats;

    await findMovie.save();

    return res.status(201).json({
      message: "Movie Updated Successfully",
      success: true,
      findMovie,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while updating the Movie",
      error: error.message,
      success: false,
    });
  }
};


//delete movie by admin

export const deleteMovie = async(req,res) => {
    try {
        const adminId = req.id;
        const {id} = req.params;

        const deleteMovie = await Movie.findByIdAndDelete({adminId, _id:id})
        if(!deleteMovie) {
            return res.status(404).json({
                message : "Movie Not Found With This Id",
                success : false
            })
        }

        return res.status(200).json({
            message : "Deleted Successfully",
            success : true
        })
    }catch (error) {
        return res.status(500).json({
          message: "An error occurred while deleting the Movie",
          error: error.message,
          success: false,
        });
      }
    };