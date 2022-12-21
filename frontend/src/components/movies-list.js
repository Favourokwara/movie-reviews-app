import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import MovieDataService from '../services/movies';

function MoviesList(props) {
    const [movies, setMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [searchRating, setSearchRating] = useState('');
    const [ratings, setRatings] = useState(['All Ratings']);
    return ( 
        <div className="App">
            Movies List
        </div>
    );
}

export default MoviesList;