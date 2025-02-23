import express from 'express';
import router from './routes/routes.js';
import cors from 'cors';
import DBConnection from './database/db.js';

const app = express();
const PORT = 8000;

app.use(cors({
    origin: ['https://project-link-it-wfbu-dqdt2iruq-sugamanirajs-projects.vercel.app','https://project-link-it-wfbu-u2kmgty8t-sugamanirajs-projects.vercel.app',
             'http://localhost:5173'], 

    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


app.use('/', router);

DBConnection();
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
