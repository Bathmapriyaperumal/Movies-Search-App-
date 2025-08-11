import React from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <div className="bg-white shadow-md rounded p-2 w-48">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
        alt={movie.Title}
        className="rounded w-full h-64 object-cover"
      />
      <h3 className="mt-2 text-center font-bold">{movie.Title}</h3>
      <p className="text-sm text-gray-600 text-center">{movie.Year}</p>
      <Link
        to={`/movie/${movie.imdbID}`}
        className="block mt-2 text-blue-500 text-center hover:underline"
      >
        Details
      </Link>
    </div>
  );
}

export default MovieCard;
