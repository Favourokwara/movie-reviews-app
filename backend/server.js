import cors from 'cors';
import express from 'express';
import movies from "./api/routes/movies-route.js";

const app = express();

app  // enable cross origin resource sharing (cors) and json parsing middleware
    .use(cors())
    .use(express.json());

app  // define all possible backend routes
    .use('/api/v1/movies/', movies)
    .use('*', (req, res) => res.status(404).json({ error: 'not found' }));

export default app;