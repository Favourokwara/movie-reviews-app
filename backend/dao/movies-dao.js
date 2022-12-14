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
}