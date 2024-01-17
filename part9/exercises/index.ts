import express from 'express';
import calculateBmi from './bmi';
import calculateExercises from './exercise';
import { all, isNumber } from './utils';

const app = express();

app.use(express.json());

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

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!target || !daily_exercises) {
        return res.status(400).send({ error: 'parameters missing' });
    }

    if (!isNumber(target) || !Array.isArray(daily_exercises)) {
        return res.status(400).send({ error: 'malformatted parameters' });
    }

    if (!all(isNumber, daily_exercises as Array<unknown>)){
        return res.status(400).send({ error: 'malformatted parameters' });
    }
    
    return res.send(calculateExercises(daily_exercises as Array<number>, Number(target)));
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});