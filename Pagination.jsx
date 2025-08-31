import React from 'react';

export default function Pagination({ current, totalPages, onPage }) {
  if (!totalPages || totalPages <= 1) return null;

  const prev = () => onPage(Math.max(1, current - 1));
  const next = () => onPage(Math.min(totalPages, current + 1));

  // show a small window of pages around current
  const pages = [];
  const start = Math.max(1, current - 2);
  const end = Math.min(totalPages, current + 2);
  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <div className="flex items-center gap-2 justify-center mt-6">
      <button onClick={prev} className="px-3 py-1 border rounded" disabled={current === 1}>
        Prev
      </button>
      {start > 1 && <span className="px-2">...</span>}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPage(p)}
          className={`px-3 py-1 rounded ${p === current ? 'bg-red-600 text-white' : 'border'}`}
        >
          {p}
        </button>
      ))}
      {end < totalPages && <span className="px-2">...</span>}
      <button onClick={next} className="px-3 py-1 border rounded" disabled={current === totalPages}>
        Next
      </button>
    </div>
  );
}
