import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import MovieDataService from '../services/movies';

function MoviesList(props) {
    const [movies, setMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [searchRating, setSearchRating] = useState('');
    const [ratings, setRatings] = useState(['All Ratings']);

    useEffect(
        () => {
            retrieveMovies();
            retrieveRatings();
        }
    )

    const retrieveMovies = () => {
        MovieDataService.getAll()
            .then(response => {
                console.log(response.data);
                setMovies(response.data.movies);
            })
            .catch(console.log);
    }

    const retrieveRatings = () => {
        MovieDataService.getRatings()
            .then(response => {
                console.log(response.data);
                setRatings(['All Ratings'].concat(response.data));
            })
            .catch(console.log)
    }

    return ( 
        <div className="App">
            Movies List
        </div>
    );
}

export default MoviesList;