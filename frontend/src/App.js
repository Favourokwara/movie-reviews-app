import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from './components/Nav';
import NavBar from './components/NavBar';

import AddReview from './components/add-review';
import MoviesList from './components/movies-list';

import Movie from './components/movie';
import Login from './components/login';


function App() {
  return ( 
    <div className='App'>
      <NavBar bg='light' expand='lg'>
        <NavBar.Brand>Movie Reviews</NavBar.Brand>
        <NavBar.Toggle aria-controls='basic-navbar-nav' />

        <NavBar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>

            <Nav.Link>
              <Link to={'/movies'}>Movies</Link>
            </Nav.Link>

            <Nav.Link>
              {user ?
                (<a onclick={logout}>Logout User</a>)
                : (<Link to={'/login'}>Login</Link>)}
            </Nav.Link>

          </Nav>
        </NavBar.Collapse>
      </NavBar>

      <Routes>
        {['/', '/movies'].map(path => <Route exact path={path} element={<MoviesList />} />)}
        <Route path='/movies/:id/review' element={<AddReview user={user} />} />
        <Route path='/movies/:id/' element={<Movie user={user} />} />
        <Route path='/login' element={<Login login={login} />} />
      </Routes>
    </div>
  );
}

export default App;