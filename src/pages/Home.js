import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Carousel from '../components/Carousel/Carousel';
import MovieList from '../components/MovieList/MovieList';
import styled from 'styled-components';
import theme from '../styles/theme';

import {
  fetchMostPopularMovies,
  fetchTopRatedMovies,
  fetchNowPlayingMovies,
} from '../store/actions/movie';

const StyledMain = styled.main`
  background-color: ${theme.colors.black};
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
  }, []);

  // console.log('home | most popular', mostPopularMovies);
  // console.log('home | top rated', topRatedMovies);

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
    mostPopularMovies: state.getMovies.mostPopular,
    topRatedMovies: state.getMovies.topRated,
    nowPlayingMovies: state.getMovies.nowPlaying,
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
