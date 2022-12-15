import { ObjectId } from 'mongodb';

let movies;

class MoviesDao {
    /**Retrieves and stores the `movies` collection object within the database.*/
    static async injectDatabase(connection) {
        if (movies) { return; }

        try {
            movies = await connection.db(process.env.DB_NAME).collection('movies');
        } catch (error) {
            console.error(`unable to connect to ${process.env.DB_NAME}: ${error}`);
        }
    }

    static async getMovies({filters = null, pages = 0, moviesPerPage = 20} = {}) {
        let query, cursor;  // create query document & cursor object with results.
        
        if (filters) {
            if ('title' in filters) {
                query = {$text: {$search: filters['title']}};
            }
            else if ('rated' in filters) {
                query = {'rated': {$eq: filters['rated']}};
            }
        }

        try {
            cursor = await movies  // query the movies collection for results
            .find(query).limit(moviesPerPage).skip(moviesPerPage * pages);

            return {
                moviesList: await cursor.toArray(),
                totalNumMovies: await movies.countDocuments(),
            };
        } catch (error) {
            console.error(`Unable to query movies: ${error}`);
            return {moviesList: [], totalNumMovies: 0};
        }
    }
}