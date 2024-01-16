import express from 'express'

const app = express()

app.get('/hello', (_req, res) => {
    res.send('hello full stack')
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})