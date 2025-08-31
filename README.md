# Movies Search App

A React app that searches OMDB, lists results with pagination, shows movie details, and allows saving favorites.

## Features
- Search movies using OMDB API
- Filter by type (movie/series/episode) using OMDB `type` parameter (no client-side filter)
- Pagination (OMDB returns 10 results per page)
- Movie detail page (full plot, cast, ratings)
- Favorites saved to `localStorage`
- Built with React, React Router, Tailwind CSS
- Deployable to Netlify

## Setup
1. `npm install`
2. Add `.env.local` with `VITE_OMDB_API_KEY=your_key`
3. `npm run dev`

## Build & Deploy
- `npm run build`
- Deploy `dist/` to Netlify. Set the environment variable `VITE_OMDB_API_KEY` in Netlify settings.

