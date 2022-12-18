import express from 'express';

import MoviesController from '../controllers/movies-controller.js';
import ReviewsController from '../controllers/reviews-controller.js';

const router = express.Router();

router.route('/');

router.route('/reviews');

router.route('/id/:id');

router.route('/ratings');

export default router;