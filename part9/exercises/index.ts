import express from 'express';
import calculateBmi from './bmi';
import { isNumber } from './utils';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('hello full stack');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    if (!isNumber(height) || !isNumber(weight)){
        return res.status(400).send({ error: 'malformatted parameters' });
    }
    return res.send({
        weight, height,
        bmi: calculateBmi(Number(height), Number(weight))
    });
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});