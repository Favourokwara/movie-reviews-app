import dotenv from 'dotenv';
import mongodb from 'mongodb';
import app from './server.js';

import MoviesDAO from './dao/movies-dao.js';
import ReviewsDAO from './dao/reviews-dao.js';

async function main() {
    dotenv.config();  // adds .env file into the local environment variables.
    const port = process.env.DEV_PORT || 8000;

    // Instantiate the mongodb client object used to connect to the database.
    const client = new mongodb.MongoClient(process.env.DB_URI);

    try {
        await client.connect();

        await MoviesDAO.injectDatabase(client);
        await ReviewsDAO.injectDatabase(client);

        app
            .listen(port, () => console.log(`server is running on ${port}`));

    } catch (error) {
        console.error(error);
        process.exitCode = 1;
    }
}

main().catch(console.error)