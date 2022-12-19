import ReviewsDAO from '../../dao/reviews-dao.js';

class ReviewsController {
    /**
     * Adds new review document to the database and responds with an object
     * with the success status of the executed `POST` request.
     */
    static async apiPostReview(request, response) {
        try {
            const { movie_id, user_id, name, review } = request.body;
            const response = await ReviewsDAO.addReview(movie_id,
                { name, _id: user_id }, review, new Date());

            response.json({ status: 'success' });

        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    }

    /**
     * Updates the specified review document and responds with an object
     * with the success status of the executed `PUT` request.
     */
    static async apiUpdateReview(request, response) {
        try {
            const reviewId = request.body.review_id;
            const review = request.body.review, date = new Date();

            const ReviewResponse = await ReviewsDAO.updateReview(
                reviewId, request.body.user_id, review, date);
            const { error } = ReviewResponse;

            if (error) response.status.json({ error });
            
            if (ReviewResponse.modifiedCount === 0) {
                throw new Error('unable to update review. User may not be original poster')
            }
            response.json({ status: 'success' });

        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    }

    /**
     * Deletes the specified review document and responds with an object with
     * the success status of the executed `DELETE` request.
     */
    static async apiDeleteReview(request, response) {
        try {
            const reviewId = request.body.review_id;
            const userId = request.body.user_id;
            const ReviewResponse = await ReviewsDAO.deleteReview(
                reviewId, userId);

            response.json({ status: 'success' });

        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    }
}

export default ReviewsController;