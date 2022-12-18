import MoviesDao from '../../dao/movies-dao.js';

class MoviesController {
    /**
     * Middleware that handles the requests made to the `api/v#/movies/` route.
     */
    static async apiGetMovies(request, response) {
        const moviesPerPage = request.query.moviesPerPage
            ? parseInt(request.query.moviesPerPage) : 20;
        const page = request.query.page
            ? parseInt(request.query.page) : 0;
        
        let filters = {};

        if (request.query.rated) {
            filters.rated = request.query.rated;

        } else if (request.query.title) {
            filters.title = request.query.title;
        }

        const { moviesList, totalNumMovies } = await MoviesDao
            .getMovies({ filters, page, moviesPerPage });

        response.json({
            movies: moviesList, page, filters,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies
        });
    }

    /**
     * Middleware that handles the requests made to the `/movies/id/:id` route.
     */
    static async apiGetMovieById(request, response) {
        try {
            let id = request.params.id || {};
            let movie = await MoviesDao.getMovieById(id);

            if (!movie) {
                response.status(404).json({ error: 'not found' });
            } else {
                response.json(movie);
            }

        } catch (error) {
            console.log(`api, ${error}`);
            response.status(500).json({ error });
        }
    }

    /**
     * Middleware that handles the requests made to the `/movies/ratings` route.
     */
    static async apiGetRatings(request, response) {
        try {
            let ratings = await MoviesDao.getRatings();
            response.json(ratings);

        } catch (error) {
            console.log(`api, ${error}`);
            response.status(500).json({ error });
        }
    }
}

export default MoviesController;