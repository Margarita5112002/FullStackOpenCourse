import express from "express";

const PORT = 3001;

const app = express();
app.use(express.json());

app.get('/api/ping', (_req, res) => {
    res.send('pong');
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});