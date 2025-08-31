import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

export default function Favorites() {
  const [list, setList] = useState(loadFavs());

  function remove(id) {
    const idx = list.findIndex((f) => f.imdbID === id);
    if (idx >= 0) {
      const newList = [...list];
      newList.splice(idx, 1);
      setList(newList);
      saveFavs(newList);
    }
  }

  if (!list.length) return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <p className="text-gray-600">No favorites yet. Search and add some!</p>
      <Link to="/" className="mt-4 inline-block text-blue-600">Back to search</Link>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Favorites</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {list.map(m => (
          <div key={m.imdbID} className="bg-white rounded shadow p-3">
            <img src={m.Poster !== 'N/A' ? m.Poster : '/placeholder-poster.png'} alt={m.Title} className="h-48 w-full object-cover rounded" />
            <h3 className="mt-2 font-semibold">{m.Title}</h3>
            <p className="text-sm text-gray-500">{m.Year}</p>
            <div className="mt-2 flex gap-2">
              <Link to={`/movie/${m.imdbID}`} className="px-3 py-1 border rounded">View</Link>
              <button onClick={() => remove(m.imdbID)} className="px-3 py-1 border rounded">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
