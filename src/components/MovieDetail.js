import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const MovieDetail = (props) => {
  const [movieInfo, setMovieInfo] = useState({ rating: null });

  // FETCH MOVIE INFO AND VIDEO.
  const getMovie = async (id) => {
    const API_KEY = process.env.REACT_APP_TMDB_KEY;
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
    const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`;
    const creditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`;

    try {
      const [movie, video, credits] = await Promise.all([
        fetch(url).then((movieRes) => movieRes.json()),
        fetch(videoUrl).then((videoRes) => videoRes.json()),
        fetch(creditsUrl).then((creditRes) => creditRes.json()),
      ]);

      // might need a .then() for trailer loading bug.

      const trailerKey = video.results.filter(
        (video) => video.site === 'YouTube'
      )[0].key;

      const hrs = Math.floor(movie.runtime / 60);
      const mins = movie.runtime % 60;
      const imgUrl = `https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}`;

      setMovieInfo({
        title: movie.title,
        year: movie.release_date.slice(0, 4),
        duration: `${hrs}h${mins}mins`,
        rating: movie.vote_average,
        synoposis: movie.overview,
        image: imgUrl,
        movie_id: movie.id,
        trailerKey: trailerKey,
      });

      console.log('from getMovie', credits.cast);
    } catch (err) {
      console.log(err);
    }
  };

  // Link star icons with ratings.

  useEffect(() => {
    console.log(props);
    const id = props.match.params.movie_id;
    getMovie(id);
  }, []);

  return (
    <div className="MovieDetail">
      <img
        className="MovieImage"
        src={movieInfo.image}
        alt={`${movieInfo.title} poster`}
      />

      <div className="MovieInfo">
        <h1 style={{ letterSpacing: '2px' }}>{movieInfo.title}</h1>
        <p
          style={{
            color: '#6e828a',
            letterSpacing: '3px',
          }}
        >
          {movieInfo.year} | {movieInfo.duration} | PG-13
        </p>
        <h3>
          {Array(3).fill(<FaStar color="#ffc93c" />)}
          {movieInfo.rating}
          {/* {console.log('from render', movieInfo)} */}
        </h3>

        <h2 style={{ letterSpacing: '3px' }}>SYNOPSIS</h2>
        <p
          style={{
            color: '#6e828a',
            lineHeight: '1.8',
            textAlign: 'justify',
            margin: '0 auto',
            letterSpacing: '1px',
          }}
        >
          {movieInfo.synoposis}
        </p>
        <br />

        <h2 style={{ letterSpacing: '3px' }}>TRAILER</h2>
        <iframe
          title="a"
          className="MovieTrailer"
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${movieInfo.trailerKey}?controls=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default MovieDetail;