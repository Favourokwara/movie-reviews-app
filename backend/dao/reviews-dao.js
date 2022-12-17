import { ObjectId } from 'mongodb';

let reviews;

class ReviewsDao {
    /**
     * Creates an instance of the reviews collection object for quering reviews.
     * @param {Object} client MongoClient object for connecting to the database.
     */
    static async injectDatabase(client) {
        if (reviews) return;
        try {
            reviews = await client.db(process.env.DB_NAME).collection('reviews');
        } catch (error) {
            console.error(`Unable to establish handle within reviews: ${error}`);
        }
    }
}

export default ReviewsDao;