const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE = 'https://www.omdbapi.com/';

async function fetchFromOMDB(params) {
  const url = new URL(BASE);
  Object.entries({ apikey: API_KEY, ...params }).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v);
  });
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Network error while contacting OMDB.');
  const json = await res.json();
  if (json.Response === 'False') {
    // OMDB signals error via Response: "False"
    throw new Error(json.Error || 'OMDB returned an error');
  }
  return json;
}

export async function searchMovies(query, type = '', page = 1) {
  // type: '' | 'movie' | 'series' | 'episode' — we pass type directly to API (requirement)
  return fetchFromOMDB({ s: query, type: type || undefined, page });
}

export async function getMovieById(imdbID) {
  // plot=full for detailed view
  return fetchFromOMDB({ i: imdbID, plot: 'full' });
}
