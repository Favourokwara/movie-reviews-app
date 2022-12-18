import MoviesDao from '../../dao/movies-dao.js';

class MoviesController {
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
        })
    }
}

export default MoviesController;