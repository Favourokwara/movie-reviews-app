import { ObjectId } from 'mongodb';

let movies;

class MoviesDAO {
    /**
     * Instantiates interface used for communicating with the movies collection.
     * @param {Object} client MongoClient object for connecting to the database.
     */
    static async injectDatabase(client) {
        if (movies) return;
        try {
            movies = await client.db(process.env.DB_NAME).collection('movies');
        } catch (error) {
            console.error(`Unable to establish handle within movies: ${error}`);
        }
    }

    /**
     * Queries the movies collection and returns movies matching the filter criteria.
     * @param {Object} param0 Object containing the criteria for returning a movie.
     */
    static async getMovies({ filters = null, pages = 0, moviesPerPage = 20 } = {}) {
        let query, cursor;

        if (filters) {
            if ('title' in filters) {
                query = { $text: { $search: filters['title'] } };
            } else if ('rated' in filters) {
                query = { 'rated': { $eq: filters['rated'] } };
            }
        }

        try {
            cursor = await movies
                .find(query).limit(moviesPerPage).skip(moviesPerPage * pages);

            const moviesList = await cursor.toArray();
            const totalNumMovies = await movies.countDocuments(query);
            return { moviesList, totalNumMovies };

        } catch (error) {
            console.error(`Unable to execute find command: ${error}`);
            return { moviesList: [], totalNumMovies: 0 };
        }
    }

    /**
     * Returns the movie that contains the given id from the movies collection.
     * @param {string} id String containing the id of the document to retrieve.
     */
    static async getMovieById(id) {
        try {
            return await movies.aggregate([
                { $match: { _id: new ObjectId(id) } },
                {
                    $lookup: {
                        from: 'reviews',
                        localField: '_id',
                        foreignField: 'movie_id',
                        as: 'reviews'
                    }
                }
            ]).next();

        } catch (error) {
            console.error(`Something went wrong in getMoviesById: ${error}`);
            throw error;
        }
    }

    /**
     * Returns array containing all possible ratings a movie object could have.
     */
    static async getRatings() {
        let ratings = [];

        try {
            ratings = await movies.distinct('rated');
        } catch (error) {
            console.error(`Unable to get ratings: ${error}`);
        }

        return ratings;
    }
}

export default MoviesDAO;