import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieById } from '../services/omdbService';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');
      try {
        const res = await getMovieById(id);
        setMovie(res);
      } catch (err) {
        setError(err.message || 'Failed to load movie details');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/" className="text-sm text-blue-600">← Back to search</Link>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-poster.png'}
          alt={movie.Title}
          className="w-full object-cover rounded shadow"
        />
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold">{movie.Title} ({movie.Year})</h2>
          <p className="text-sm text-gray-600 my-2">{movie.Genre} • {movie.Runtime} • {movie.Rated}</p>
          <p className="mt-4">{movie.Plot}</p>

          <div className="mt-4">
            <h3 className="font-semibold">Cast</h3>
            <p>{movie.Actors}</p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">Ratings</h3>
            <ul className="list-disc pl-5">
              {movie.Ratings && movie.Ratings.length > 0 ? (
                movie.Ratings.map((r) => <li key={r.Source}>{r.Source}: {r.Value}</li>)
              ) : (
                <li>N/A</li>
              )}
            </ul>
          </div>

          <div className="mt-6">
            <button onClick={() => alert('Demo: proceed to booking or ticketing')} className="px-4 py-2 bg-red-600 text-white rounded">
              Book Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
