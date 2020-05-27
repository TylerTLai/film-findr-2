import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import MovieCardList from './MovieCardList';

const TopRated = ({ movieData }) => {
  const [topRated, setTopRated] = useState([]);

  const discoverTopRated = async () => {
    const API_KEY = process.env.REACT_APP_TMDB_KEY;
    const currentYear = new Date().getFullYear() - 1;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&sort_by=vote_average.desc&sort_by=vote_count.desc&include_adult=false&include_video=false&primary_release_year=${currentYear}&page=1`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setTopRated(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    discoverTopRated();
  }, []);

  const clearSearchResults = () => {
    alert('clear search results');
  };

  return (
    <div>
      {movieData && movieData.length ? (
        <>
          <h3 className="SearchResults">Search Results</h3>
          <button className="ClearButton" onClick={clearSearchResults}>
            Clear search results
          </button>
          <MovieCardList movies={movieData} />
        </>
      ) : (
        <>
          <h1 className="title">Top Rated</h1>
          <div className="MovieCardList">
            {topRated
              .filter((topRated) => topRated.poster_path)
              .map((topRated) => (
                <MovieCard
                  key={topRated.id}
                  id={topRated.id}
                  movie={topRated}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TopRated;
