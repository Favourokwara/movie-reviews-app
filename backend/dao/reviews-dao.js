import { ObjectId } from 'mongodb';

let reviews;

class ReviewsDao {
    /**
     * Instantiates interface used for communicating with the reviews collection.
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

    /**
     * Adds review documnent with the specified details to the reviews collection.
     * @returns Returns document that contains the status of the insert operation.
     */
    static async addReview(movieId, user, review, date) {
        try {
            return await review.insertOne({
                name: user.name,
                user_id: user._id,
                date, review,
                movie_id: ObjectId(movieId)
            });

        } catch (error) {
            console.error(`Unable to post review: ${error}`);
            return {error};
        }
    }
}

export default ReviewsDao;