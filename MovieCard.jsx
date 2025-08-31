import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie, isFav, onToggleFav }) {
  return (
    <div className="bg-white rounded-md shadow-sm overflow-hidden">
      <div className="relative">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-poster.png'}
          alt={movie.Title}
          className="w-full h-64 object-cover"
        />
        <button
          onClick={() => onToggleFav(movie)}
          className={`absolute top-2 right-2 p-2 rounded-full text-white ${
            isFav ? 'bg-yellow-500' : 'bg-gray-700/70'
          }`}
          title="Toggle favorite"
        >
          ★
        </button>
        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
          {movie.Type} • {movie.Year}
        </div>
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-lg">{movie.Title}</h3>
        <div className="mt-3 flex gap-2">
          <Link to={`/movie/${movie.imdbID}`} className="px-3 py-1 bg-red-600 text-white rounded">
            View
          </Link>
          <button
            onClick={() => alert('Demo: integrate booking flow or external booking here')}
            className="px-3 py-1 border rounded"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
}
