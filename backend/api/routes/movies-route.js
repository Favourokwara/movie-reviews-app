import express from 'express';

import MoviesController from '../controllers/movies-controller.js';
import ReviewsController from '../controllers/reviews-controller.js';

const router = express.Router();

router.route('/')
    .get(MoviesController.apiGetMovies);

router.route('/reviews')
    .put(ReviewsController.apiUpdateReview)
    .post(ReviewsController.apiPostReview)
    .delete(ReviewsController.apiDeleteReview);

router.route('/id/:id')
    .get(MoviesController.apiGetMovieById);

router.route('/ratings')
    .get(MoviesController.apiGetRatings);

export default router;