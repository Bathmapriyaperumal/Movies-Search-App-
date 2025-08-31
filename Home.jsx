import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { searchMovies } from '../services/omdbService';

const FAVORITES_KEY = 'movies_app_favorites_v1';

function loadFavs() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveFavs(list) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState(loadFavs());

  useEffect(() => {
    // when page changes, refetch current query
    if (query) fetchData(query, type, page);
  }, [page]);

  async function fetchData(q, typeParam = '', pageParam = 1) {
    setLoading(true);
    setError('');
    try {
      const json = await searchMovies(q, typeParam, pageParam);
      setMovies(json.Search || []);
      setTotalResults(Number(json.totalResults || 0));
      setPage(pageParam);
    } catch (err) {
      setMovies([]);
      setTotalResults(0);
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  function handleSearch({ query: q, type: t, page: p }) {
    setQuery(q);
    setType(t);
    setPage(p || 1);
    fetchData(q, t, p || 1);
  }

  function toggleFav(movie) {
    // we won't use array.filter for the dropdown requirement — this is just local favs logic.
    const idx = favorites.findIndex((f) => f.imdbID === movie.imdbID);
    const newFavs = [...favorites];
    if (idx >= 0) {
      newFavs.splice(idx, 1);
    } else {
      // store minimal needed data
      newFavs.push({ imdbID: movie.imdbID, Title: movie.Title, Year: movie.Year, Poster: movie.Poster });
    }
    setFavorites(newFavs);
    saveFavs(newFavs);
  }

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-red-600">Movies Search</h1>
        <div>
          <a href="/favorites" className="px-3 py-1 border rounded">Favorites ({favorites.length})</a>
        </div>
      </header>

      <SearchBar onSearch={handleSearch} />

      <main className="mt-6">
        {loading && <div className="text-center py-8">Loading results...</div>}
        {error && <div className="text-center text-red-500 py-8">{error}</div>}
        {!loading && !error && movies.length === 0 && (
          <div className="text-center text-gray-500 py-16">
            Try searching for a movie (e.g., "Avengers") — results appear here.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((m) => (
            <MovieCard
              key={m.imdbID}
              movie={m}
              isFav={favorites.some((f) => f.imdbID === m.imdbID)}
              onToggleFav={toggleFav}
            />
          ))}
        </div>

        <Pagination current={page} totalPages={totalPages} onPage={(p) => setPage(p)} />
      </main>
    </div>
  );
}
