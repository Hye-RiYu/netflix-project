import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
// import './AppLayout.scss';

const AppLayout = () => {

  const [ keyword, setKeyword ] = useState('');
  const navigate = useNavigate();

  const searchByKeyword = (event) => {
    event.preventDefault()
    // url을 바꿔주기
    navigate(`/movies?q=${keyword}`);
    setKeyword('');
  }

  return (
    <div>
      <Navbar expand="lg" className="bg-black" data-bs-theme='dark'>
        <Container fluid>
          <Navbar.Brand href="/">
            <img style={{
              width: 80
            }}src='https://images.ctfassets.net/4cd45et68cgf/4nBnsuPq03diC5eHXnQYx/d48a4664cdc48b6065b0be2d0c7bc388/Netflix-Logo.jpg' alt='' />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link className="text-white me-4 link-offset-2 link-underline link-underline-opacity-0" href="/">Home</Nav.Link>
              <Nav.Link className="text-white link-offset-2 link-underline link-underline-opacity-0" href="/movies">Movies</Nav.Link>
            </Nav>
            <Form onSubmit={searchByKeyword} className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
              <Button variant="outline-danger" type='submit'>Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet/>
    </div>
  )
}

export default AppLayout
