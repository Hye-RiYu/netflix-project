import React from 'react';
import Badge from 'react-bootstrap/Badge';
import './MovieCard.style.css';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';

const MovieCard = ({ movie }) => {

  const { data: genreData } = useMovieGenreQuery();
  
  const showGenre = (genreIdList) => {
    if(!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });

    return genreNameList;
  };

  return (
    <div 
      className='movie-card'
      style={{
      backgroundImage: "url(" +
      `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` + 
        ")",
      }}
    >
      <div className='overlay'>
        <h1 className='card-title'>{movie.title}</h1>
        {showGenre(movie.genre_ids).map((id) => <Badge bg="danger">{id}</Badge>)}
        <div>
        <div>{movie.vote_average}</div>
        <div>{movie.popularity}</div>
        <div>{movie.adult? 'over18' : 'under18'}</div>
      </div>
      </div>
    </div>
  );
};

export default MovieCard;
