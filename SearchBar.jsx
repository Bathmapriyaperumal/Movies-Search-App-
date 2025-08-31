import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('');
  const [type, setType] = useState('');

  function submit(e) {
    e && e.preventDefault();
    if (!q.trim()) return;
    onSearch({ query: q.trim(), type, page: 1 });
  }

  return (
    <form onSubmit={submit} className="flex gap-2 w-full">
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search movies, series, episodes..."
        className="flex-1 px-4 py-2 rounded-lg shadow-sm border focus:outline-none"
      />
      <select
        value={type}
        onChange={(e) => {
          setType(e.target.value);
          // optionally auto-submit when type changes while query exists
          if (q.trim()) onSearch({ query: q.trim(), type: e.target.value, page: 1 });
        }}
        className="px-3 py-2 rounded-lg border"
      >
        <option value="">All</option>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
        <option value="episode">Episode</option>
      </select>
      <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-lg">
        Search
      </button>
    </form>
  );
}
