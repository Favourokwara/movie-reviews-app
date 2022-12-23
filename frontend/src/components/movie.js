import React, { useState, useEffect } from 'react';
import MovieDataService from '../services/movies';
import { Link } from 'react-router-dom';

function Movie(props) {
    const [movie, setMovie] = useState({ id: null, title: '', rated: '', reviews: [] });

    const getMovie = id => {
        MovieDataService.get(id)
            .then(response => {
                setMovie(response.data);
                console.log(response.data);
            })
            .catch(console.log);
    }

    useEffect(() => { getMovie(props.match.params.id) }, [props.match.params.id])
    return (
        <div className="App">
            Movie
        </div>
    );
}

export default Movie;