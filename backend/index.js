import dotenv from 'dotenv';
import mongodb from 'mongodb';
import app from './server.js';

async function main() {
    dotenv.config();  // adds .env file into the local environment variables.
    const port = process.env.PORT || 8000;

    // Instantiate the mongodb client object used to connect to the database.
    const client = new mongodb.MongoClient(process.env.DB_URI);

    try {
        await client.connect();

        app.listen(port,
            () => console.log(`server is running on ${port}`));

    } catch (error) {
        console.error(error);
        process.exitCode = 1;
    }
}

main().catch(console.error)