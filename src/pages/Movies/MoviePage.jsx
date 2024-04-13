import React, { useState } from 'react';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { useSearchParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import './MoviePage.style.css'
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';


// 경로 2가지
// 1. navbar에서 클릭해서 온 경우 => popularMovie 보여주기
// 2. keyword를 입력해서 온 경우 => keyword와 관련된 영화들을 보여줌

// 페이지네이션
// 페이지네이션 설치 -> page state 만들기 -> 페이지네이션 클릭할때마다 page 바꿔주기 -> page 값이 바뀔때 마다 useDearchMovie에 page 까지 넣어서 fetch

const MoviePage = () => {
  const [ query, setQuery ] = useSearchParams();
  const [ page, setPage ] = useState(1);
  const [sortBy, setSortBy] = useState(); // 정렬 기준
  const [selectedGenreId, setSelectedGenreId] = useState('All'); // 선택된 장르
  const keyword = query.get('q');

  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page });
  const { data: genresData } = useMovieGenreQuery();

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const handleSortChange = (sortBy) => {
    setSortBy(sortBy);
  };

  const handleGenreChange = (genreId) => {
    setSelectedGenreId(genreId);
  };

  const filterMoviesByGenre = (movies, selectedGenreId) => {
    if (!selectedGenreId || selectedGenreId === 'All') {
      return movies;
    }
  
    return movies.filter((movie) => movie.genre_ids.includes(parseInt(selectedGenreId)));
  };
  

  // console.log('data', data);

  const sortMovies = (movies) => {
    return movies.sort((a, b) => {
      if (sortBy === 'popularity.desc') {
        return a.popularity - b.popularity; // 인기도로 오름차순 정렬
      } else if (sortBy === 'popularity.asc') {
        return b.popularity - a.popularity; // 인기도로 내림차순 정렬
      }
      return 0;
    });
  };
  
  if (isLoading) {
    return (
      <div className='spinner-area'>
        <Spinner
        animation='border'
        variant='danger'
        style={{ width: '5rem', height: '5rem' }}
        />
      </div>
    );
  }

  if (isError) {
    return <Alert variant='danger'>{error.message}</Alert>;
  }

  // 정렬된 영화 데이터
  const sortedMovies = sortMovies(data?.results);
  // 장르를 기준으로 영화 필터링
  const filteredMovies = filterMoviesByGenre(sortedMovies, selectedGenreId);

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12} className='filter'>
          <Row className='filter-dropdown'>
            <Dropdown>
              <Dropdown.Toggle variant="danger" id="dropdown-basic">
                {sortBy ? (sortBy === 'popularity.desc' ? 'High to Low' : 'Low to High') : 'Sort'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleSortChange('')} href="#/action-1">Sort</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange('popularity.desc')} href="#/action-1">High to Low</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange('popularity.asc')} href="#/action-2">Low to High</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Row>
          <Row className='filter-dropdown'>
            <Dropdown>
              <Dropdown.Toggle variant="danger" id="dropdown-basic">
                {selectedGenreId === 'All' ? 'Genre' : genresData.find(genre => genre.id === parseInt(selectedGenreId))?.name || 'Genre'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleGenreChange('All')} href="#/action-1">All</Dropdown.Item>
                {genresData &&
                  genresData.map((genre) => (
                    <Dropdown.Item key={genre.id} onClick={() => handleGenreChange(genre.id)} href={`#/genre/${genre.id}`}>
                      {genre.name}
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
          </Row>
        </Col>
        <Col lg={8} xs={12} className='mobile-col'>
          <Row className='mobile-row'>
            {filteredMovies.map((movie, index) => 
            <Col className='mobile-card' key={index} lg={3} xs={12}>
              <MovieCard movie={movie} />
            </Col>)}
          </Row>
        </Col>
        <Row>
        <ReactPaginate
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={data?.total_pages} // 전체페이지가 몇개인지
            previousLabel="<"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={page - 1}
          />
        </Row>
      </Row>
    </Container>
  )
}

export default MoviePage;
