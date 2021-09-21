import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import {processImages} from './exifRemoving';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    processImages();
    return res.send('Hello express 🚂');
});

app.post('/', (req, res) => {
    return res.send('Received a POST HTTP method');
});

app.post('/example', (req, res) => {
    console.log(req.body)
    return res.send(`${req.body.param}`);
});

app.post('/example/:param', (req, res) => {
    return res.send(`${req.params.param}`);
});

app.listen(process.env.PORT, () =>
    console.log(`App listening on http://localhost:${process.env.PORT}`),
);