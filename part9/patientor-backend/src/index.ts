import express from "express";
import cors from 'cors';
import diagnosisRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";

const PORT = 3001;

const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.get('/api/ping', (_req, res) => {
    res.send('pong');
});
app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});