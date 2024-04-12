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
  const keyword = query.get('q');

  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page });
  const { data: genresData } = useMovieGenreQuery();

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const handleSortChange = (sortBy) => {
    setSortBy(sortBy);
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

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12} className='filter'>
          <Row className='filter-dropdown'>
            <Dropdown>
              <Dropdown.Toggle variant="danger" id="dropdown-basic">
                Sort
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleSortChange('popularity.desc')} href="#/action-1">High to Low</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange('popularity.asc')} href="#/action-2">Low to High</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Row>
          <Row className='filter-dropdown'>
            <Dropdown>
              <Dropdown.Toggle variant="danger" id="dropdown-basic">
                Genre
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {genresData &&
                  genresData.map((genre) => (
                    <Dropdown.Item key={genre.id} href={`#/genre/${genre.id}`}>
                      {genre.name}
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
          </Row>
        </Col>
        <Col lg={8} xs={12}>
          <Row>
            {sortedMovies.map((movie, index) => 
            <Col key={index} lg={4} xs={12}>
              <MovieCard movie={movie} />
            </Col>)}
          </Row>
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={data?.total_pages} // 전체페이지가 몇개인지
            previousLabel="< previous"
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
        </Col>
      </Row>
    </Container>
  )
}

export default MoviePage;
