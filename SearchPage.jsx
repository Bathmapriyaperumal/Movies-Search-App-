import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import { searchMovies } from "../services/omdbApi";

function SearchPage() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState("");

  const fetchMovies = async (query, type, page = 1) => {
    setError("");
    const data = await searchMovies(query, page, type);
    if (data.Response === "True") {
      setMovies(data.Search);
      setTotalResults(Number(data.totalResults));
      setSearchTerm(query);
      setType(type);
    } else {
      setMovies([]);
      setError(data.Error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchMovies(searchTerm, type, page);
  };

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="p-4">
      <SearchBar onSearch={(query, type) => fetchMovies(query, type)} />
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="flex flex-wrap gap-4 justify-center">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
      {totalResults > 10 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </div>
  );
}

export default SearchPage;
