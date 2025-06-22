import express from 'express'
import 'dotenv/config'
import playerRoutes from './routes/playerRoutes.js';

const app = express()
const port = process.env.PORT

app.use('/api/players', playerRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
