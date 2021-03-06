import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import Carousel from '../components/Carousel/Carousel';
import MovieList from '../components/MovieList/MovieList';

import {
  fetchMostPopularMovies,
  fetchTopRatedMovies,
  fetchNowPlayingMovies,
} from '../store/actions/movie';

const StyledMain = styled.main`
  @media (max-width: 900px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

function Home({
  mostPopularMovies,
  getPopularMovies,
  topRatedMovies,
  getTopRatedMovies,
  nowPlayingMovies,
  getNowPlayingMovies,
}) {
  useEffect(() => {
    getPopularMovies();
    getTopRatedMovies();
    getNowPlayingMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledMain>
      <Carousel />
      <MovieList title={'MOST POPULAR'} movies={mostPopularMovies} />
      <MovieList title={'TOP RATED'} movies={topRatedMovies} />
      <MovieList title={'NOW PLAYING'} movies={nowPlayingMovies} />
    </StyledMain>
  );
}

const mapStateToProps = (state) => {
  return {
    mostPopularMovies: state.movieReducer.mostPopular,
    topRatedMovies: state.movieReducer.topRated,
    nowPlayingMovies: state.movieReducer.nowPlaying,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPopularMovies: () => dispatch(fetchMostPopularMovies()),
    getTopRatedMovies: () => dispatch(fetchTopRatedMovies()),
    getNowPlayingMovies: () => dispatch(fetchNowPlayingMovies()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
