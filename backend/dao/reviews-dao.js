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
     * Adds review document with the specified details to the reviews collection.
     * @returns Return document that contains the status of the insert operation.
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
            return { error };
        }
    }

    /**
     * Update the review document in the review collection with the specified id.
     * @returns Return document that contains the status of the update operation.
     */
    static async updateReview(reviewId, userId, review, date) {
        try {
            return await reviews.updateOne(
                { user_id: userId, _id: ObjectId(reviewId) },
                { $set: { review: review, date: date } }
            );

        } catch (error) {
            console.error(`Unable to update review: ${error}`);
            return { error };
        }
    }

    /**
     * Delete the review document in the review collection with the specified id. 
     * @returns Return document that contains the status of the delete operation.
     */
    static async deleteReview(reviewId, userId) {
        try {
            return await reviews.deleteOne({
                _id: ObjectId(reviewId), user_id: userId
            });
            
        } catch (error) {
            console.error(`Unable to delete review: ${error}`);
            return { error };
        }
    }
}

export default ReviewsDao;