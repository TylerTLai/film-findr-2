import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { URL_IMG, BACKDROP_SIZE_ORIGINAL } from '../const';
import { fetchMovieDetails } from '../store/actions/movie';
import { FaStar } from 'react-icons/fa';
import { BsArrowLeft } from 'react-icons/bs';
import theme from '../styles/theme';

const StyledDetails = styled.div`
  color: ${theme.colors.white};
  padding: 2em;

  & .backArrow {
    color: ${theme.colors.gray};
    font-size: 3em;
    transition: 0.1s ease-in-out;

    &:hover {
      color: ${theme.colors.orange};
      cursor: pointer;
    }
  }

  & h1 {
    font-size: 3em;
    text-transform: uppercase;
  }

  & h2 {
    color: ${theme.colors.orange};
    font-size: 1.5em;
  }

  & h3 {
    color: ${theme.colors.gray};

    & p {
      color: ${theme.colors.orange};
    }
  }
`;

const StyledInfo = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1px;
`;

const StyledBackdrop = styled.div`
  background-image: linear-gradient(
      to right,
      ${theme.colors.black} 1%,
      rgba(0, 0, 0, 0) 10%,
      rgba(0, 0, 0, 0)
    ),
    url(${({ imgURL }) => imgURL});
  background-size: cover;
  background-position: center;
  width: 65vw;
  background-repeat: no-repeat;
`;

const StyledTopContainer = styled.div`
  background-color: ${theme.colors.black};
  display: grid;
  grid-template-columns: 1fr, 2fr;
  grid-template-areas: 'details backdrop';
  height: 100%;

  & ${StyledDetails} {
    grid-area: details;
  }

  & ${StyledBackdrop} {
    grid-area: backdrop;
  }
`;

const StyledBottomContainer = styled.div`
  display: grid;
  background-color: ${theme.colors.black};
  color: ${theme.colors.white};
  padding: 2em;

  & h1 {
    font-size: 3em;
  }
`;

function Movie({ movieDetails, fetchMovie, history }) {
  useEffect(() => {
    const movieId = history.location.pathname.slice(1);
    fetchMovie(movieId);
  }, []);

  console.log('from movie', history);
  const genres = [];

  const backdropURL =
    URL_IMG + BACKDROP_SIZE_ORIGINAL + movieDetails.backdrop_path;

  return (
    <>
      <StyledTopContainer>
        <StyledDetails>
        <BsArrowLeft className='backArrow' onClick={history.goBack} />
          <h1>{movieDetails.title}</h1>
          <h2>{movieDetails.tagline}</h2>

          <StyledInfo>
            <h3>
              Release Date <p>{movieDetails.release_date}</p>
            </h3>
            <h3>
              Rating
              <p>
                {movieDetails.vote_average}
                <FaStar color="#ffc93c" />
              </p>
            </h3>
            <h3>
              Runtime <p>{movieDetails.runtime} mins</p>
            </h3>
          </StyledInfo>

          <h3>Plot</h3>
          <p>{movieDetails.overview}</p>
        </StyledDetails>
        <StyledBackdrop imgURL={backdropURL}></StyledBackdrop>
      </StyledTopContainer>
      <StyledBottomContainer>
        <h1>Cast & Crew</h1>
        <h1>Images</h1>
        <h1>Videos</h1>
      </StyledBottomContainer>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    movieDetails: state.getMovies.movieDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMovie: (movieId) => dispatch(fetchMovieDetails(movieId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
