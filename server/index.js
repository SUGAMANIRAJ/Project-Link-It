import express from 'express';
import router from './routes/routes.js';
import cors from 'cors';
import DBConnection from './database/db.js';

const app = express();
const PORT = 8000;

app.use(cors({
    origin: 'https://project-link-it-ng4l-cuu2wqbwq-sugamanirajs-projects.vercel.app', // Allow only your frontend
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json()); // Ensure request body is parsed
app.use('/', router);

DBConnection();
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
