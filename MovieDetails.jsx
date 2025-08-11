import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/omdbApi";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await getMovieDetails(id);
      if (data.Response === "True") {
        setMovie(data);
      } else {
        setError(data.Error);
      }
    };
    fetchDetails();
  }, [id]);

  const addToFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.find((m) => m.imdbID === movie.imdbID)) {
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };

  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!movie) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
          alt={movie.Title}
          className="w-64 h-auto"
        />
        <div>
          <h1 className="text-2xl font-bold">{movie.Title} ({movie.Year})</h1>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
          <button
            onClick={addToFavorites}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add to Favorites
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
