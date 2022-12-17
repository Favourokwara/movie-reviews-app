import { ObjectId } from 'mongodb';

let movies;

class MoviesDao {
    /**
     * Creates an instance of the movies collection object for quering movies.
     * @param {Object} client MongoClient object for connecting to database.
     */
    static async injectDatabase(client) {
        if (movies) return;
        try {
            movies = await client.db(process.env.DB_NAME).collection('movies')
        } catch (error) {
            console.error(`Unable to connect to movies collection: ${error}`);
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
}