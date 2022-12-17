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
}