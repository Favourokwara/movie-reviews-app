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
    <div className="App">
      <NavBar></NavBar>

      <Routes></Routes>
    </div>
  );
}

export default App;